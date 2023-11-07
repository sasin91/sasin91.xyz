import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Object3DEventMap, Sphere, Vector3 } from "three";
import { Octree } from "three/examples/jsm/math/Octree";

import { frameSteps, Gravity } from "./game";
import { checkSphereCollisionsFn, Collider } from "./physics";

export default function SphereCollider({
  id,
  radius,
  octree,
  position,
  colliders,
  checkSphereCollisions,
  children,
}: PropsWithChildren<{
  id: number;
  radius: number;
  octree: Octree;
  position: number[];
  colliders: Collider[];
  checkSphereCollisions: checkSphereCollisionsFn;
}>) {
  const ref = useRef<Group<Object3DEventMap>>(null);

  const sphere = useMemo(
    () => new Sphere(new Vector3(...position), radius),
    [position, radius],
  );
  const velocity = useMemo(() => new Vector3(), []);

  useEffect(() => {
    console.log("adding reference to this sphere collider");
    colliders[id] = { sphere: sphere, velocity: velocity };
  }, [colliders, id, sphere, velocity]);

  function updateSphere(
    delta: number,
    octree: Octree,
    sphere: Sphere,
    velocity: Vector3,
  ) {
    sphere.center.addScaledVector(velocity, delta);

    const result = octree.sphereIntersect(sphere);

    if (result) {
      const factor = -result.normal.dot(velocity);
      velocity.addScaledVector(result.normal, factor * 1.5);

      sphere.center.add(result.normal.multiplyScalar(result.depth));
    } else {
      velocity.y -= Gravity * delta;
    }

    const damping = Math.exp(-1.5 * delta) - 1;
    velocity.addScaledVector(velocity, damping);

    checkSphereCollisions(sphere, velocity);

    ref.current!.position.copy(sphere.center);
  }

  useFrame((_, delta) => {
    const deltaSteps = Math.min(0.05, delta) / frameSteps;
    for (let i = 0; i < frameSteps; i++) {
      updateSphere(deltaSteps, octree, sphere, velocity);
    }
  });

  return <group ref={ref}>{children}</group>;
}
