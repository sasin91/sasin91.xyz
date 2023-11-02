#! /usr/bin/env bash
bash ./get_helm.sh
curl --proto '=https' --tlsv1.2 -sSfL https://run.linkerd.io/install | sh
export PATH=$PATH:$HOME.linkerd2/bin

helm repo add linkerd https://helm.linkerd.io/stable
helm repo add l5d-smi https://linkerd.github.io/linkerd-smi
helm repo add kong https://charts.konghq.com
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install linkerd-crds linkerd/linkerd-crds -n linkerd --create-namespace
helm install linkerd-control-plane \
  -n linkerd \
  --set-file identityTrustAnchorsPEM=ca.crt \
  --set-file identity.issuer.tls.crtPEM=issuer.crt \
  --set-file identity.issuer.tls.keyPEM=issuer.key \
  linkerd/linkerd-control-plane
helm install linkerd-cni -n linkerd-cni --create-namespace linkerd/linkerd2-cni

# Metrics & Monitoring
helm install l5d-smi/linkerd-smi --generate-name

# LetsEncrypt
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.13.2 \
  --set installCRDs=true

helm install kong kong/kong

kubectl patch deploy kong-kong --patch '{
  "spec": {
    "template": {
      "spec": {
        "containers": [
          {
            "name": "proxy",
            "env": [
              {
                "name": "KONG_STREAM_LISTEN",
                "value": "0.0.0.0:3724"
              },
              {
                "name": "KONG_STREAM_LISTEN",
                "value": "0.0.0.0:8085"
              }
            ],
            "ports": [
              {
                "containerPort": 3724,
                "name": "ac-authserver",
                "protocol": "TCP"
              },
              {
                "containerPort": 8085,
                "name": "ac-worldserver",
                "protocol": "TCP"
              }
            ]
          }
        ]
      }
    }
  }
}'

kubectl patch service kong-kong-proxy --patch '{
  "spec": {
    "ports": [
      {
        "name": "ac-authserver",
        "port": 3724,
        "protocol": "TCP",
        "targetPort": 3724
      },
      {
        "name": "ac-worldserver",
        "port": 8085,
        "protocol": "TCP",
        "targetPort": 8085
      }
    ]
  }
}'

kubectl apply -f mariadb-sts.yml
kubectl apply -f ingress.yml
kubectl apply -f nextjs.yml
kubectl apply -f azerothcore.yml

kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -