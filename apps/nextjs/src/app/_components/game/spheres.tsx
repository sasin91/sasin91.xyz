import * as React from "react";
import { Decal, Float, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Object3DEventMap, Sphere, Vector3 } from "three";
import { Octree } from "three/examples/jsm/math/Octree";

import Paintball from "~/images/game/ui/paintball.png";

const Ball = ({ imgUrl }: { imgUrl: string }) => {
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[0.2, 5]} />
        <meshStandardMaterial
          color={0xdede8d}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          castShadow={true}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

export default function Spheres() {
  const NUM_SPHERES = 100;
  const { scene } = useGLTF(
    "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@octree/public/models/scene-transformed.glb",
  );

  const octree = React.useMemo(() => {
    console.log("new Octree");
    return new Octree().fromGraphNode(scene);
  }, [scene]);

  const colliders = React.useRef<{ sphere: Sphere; velocity: Vector3 }[]>([]);
  const v1 = new Vector3();
  const v2 = new Vector3();
  const v3 = new Vector3();

  function SphereCollider({
    id,
    radius,
    children,
  }: React.PropsWithChildren<{
    id: number;
    radius: number;
  }>) {
    const ref = React.useRef<Group<Object3DEventMap>>(null);

    const sphere = React.useMemo(
      () => new Sphere(new Vector3(), radius),
      [radius],
    );
    const velocity = React.useMemo(() => new Vector3(), []);

    React.useEffect(() => {
      colliders.current[id] = { sphere: sphere, velocity: velocity };
    }, [colliders, id, sphere, velocity]);

    function updateSphere(delta: number) {
      sphere.center.addScaledVector(velocity, delta);

      const result = octree.sphereIntersect(sphere);

      if (result) {
        const factor = -result.normal.dot(velocity);
        velocity.addScaledVector(result.normal, factor * 1.5);

        sphere.center.add(result.normal.multiplyScalar(result.depth));
      } else {
        velocity.y -= 30 * delta;
      }

      const damping = Math.exp(-1.5 * delta) - 1;
      velocity.addScaledVector(velocity, damping);

      checkSphereCollisions();

      if (ref.current) {
        ref.current.position.copy(sphere.center);
      }
    }

    function checkSphereCollisions() {
      for (let i = 0, length = colliders.current.length; i < length; i++) {
        const c = colliders.current[i];

        if (c.sphere) {
          const d2 = sphere.center.distanceToSquared(c.sphere.center);
          const r = sphere.radius + c.sphere.radius;
          const r2 = r * r;

          if (d2 < r2) {
            const normal = v1
              .subVectors(sphere.center, c.sphere.center)
              .normalize();
            const impact1 = v2
              .copy(normal)
              .multiplyScalar(normal.dot(velocity));
            const impact2 = v3
              .copy(normal)
              .multiplyScalar(normal.dot(c.velocity));
            velocity.add(impact2).sub(impact1);
            c.velocity.add(impact1).sub(impact2);
            const d = (r - Math.sqrt(d2)) / 2;
            sphere.center.addScaledVector(normal, d);
            c.sphere.center.addScaledVector(normal, -d);
          }
        } else if (c.capsule) {
          const center = v1
            .addVectors(c.capsule.start, c.capsule.end)
            .multiplyScalar(0.5);
          const r = sphere.radius + c.capsule.radius;
          const r2 = r * r;
          for (const point of [c.capsule.start, c.capsule.end, center]) {
            const d2 = point.distanceToSquared(sphere.center);
            if (d2 < r2) {
              const normal = v1.subVectors(point, sphere.center).normalize();
              const impact1 = v2
                .copy(normal)
                .multiplyScalar(normal.dot(c.velocity));
              const impact2 = v3
                .copy(normal)
                .multiplyScalar(normal.dot(velocity));
              c.velocity.add(impact2).sub(impact1);
              velocity.add(impact1).sub(impact2);
              const d = (r - Math.sqrt(d2)) / 2;
              sphere.center.addScaledVector(normal, -d);
            }
          }
        }
      }
    }

    useFrame((_, delta) => {
      const deltaSteps = Math.min(0.05, delta) / 5;
      for (let i = 0; i < 5; i++) {
        updateSphere(deltaSteps);
      }
    });

    return <group ref={ref}>{children}</group>;
  }

  return (
    <>
      {[...Array(NUM_SPHERES).keys()].map((i) => (
        <SphereCollider key={i} id={i} radius={0.2}>
          <Ball imgUrl={Paintball.src} />
        </SphereCollider>
      ))}
    </>
  );
}
