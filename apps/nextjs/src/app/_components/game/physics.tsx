import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { suspend } from "suspend-react";
import { FileLoader, Sphere, Vector3 } from "three";
import { Capsule } from "three/examples/jsm/math/Capsule";

import useOctree from "~/app/hooks/useOctree";
import Ball from "./ball";
import { balls, radius, v1, v2, v3 } from "./game";
import { NightSky } from "./night-sky";
import Player from "./player";
import SphereCollider from "./sphere-collider";

export type Collider = {
  sphere?: Sphere;
  velocity: Vector3;
  capsule?: Capsule;
};

export type checkSphereCollisionsFn = (
  sphere: Sphere,
  velocity: Vector3,
) => void;

export default function Physics() {
  const { nodes, scene } = useGLTF("/assets/maps/scene-transformed.glb");
  const octree = useOctree(scene);

  const colliders = useRef<Collider[]>([]);

  function checkSphereCollisions(sphere: Sphere, velocity: Vector3) {
    for (let i = 0, length = colliders.current.length; i < length; i++) {
      const c = colliders.current[i]!;

      if (c.sphere) {
        const d2 = sphere.center.distanceToSquared(c.sphere.center);
        const r = sphere.radius + c.sphere.radius;
        const r2 = r * r;

        if (d2 < r2) {
          const normal = v1
            .subVectors(sphere.center, c.sphere.center)
            .normalize();
          const impact1 = v2.copy(normal).multiplyScalar(normal.dot(velocity));
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

  return (
    <>
      <group dispose={null}>
        <NightSky />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne007.geometry}
          material={nodes.Suzanne007.material}
          position={[1.74, 1.04, 24.97]}
        />
      </group>
      {balls.map(({ position }, i) => (
        <SphereCollider
          key={i}
          id={i}
          radius={radius}
          octree={octree}
          position={position}
          colliders={colliders.current}
          checkSphereCollisions={checkSphereCollisions}
        >
          <Ball radius={radius} />
        </SphereCollider>
      ))}
      <Player octree={octree} colliders={colliders.current} />
    </>
  );
}
