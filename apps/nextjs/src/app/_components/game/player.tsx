import { useEffect, useMemo, useRef } from "react";
import { Gltf } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { suspend } from "suspend-react";
import { Camera, Vector3 } from "three";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import { Octree } from "three/examples/jsm/math/Octree";

import useKeyboard from "~/app/hooks/useKeyboard";
import { ballCount } from "./game";
import { Collider } from "./physics";

const GRAVITY = 30;
const STEPS_PER_FRAME = 5;

const suzi = import("@pmndrs/assets/models/suzi.glb").then(
  (module) => module.default,
);

function getForwardVector(camera: Camera, playerDirection: Vector3) {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();
  return playerDirection;
}

function getSideVector(camera: Camera, playerDirection: Vector3) {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();
  playerDirection.cross(camera.up);
  return playerDirection;
}

function controls(
  keyboard: ReturnType<typeof useKeyboard>,
  camera: Camera,
  delta: number,
  playerVelocity: Vector3,
  playerOnFloor: boolean,
  playerDirection: Vector3,
) {
  const speedDelta = delta * (playerOnFloor ? 25 : 8);
  keyboard["KeyA"] &&
    playerVelocity.add(
      getSideVector(camera, playerDirection).multiplyScalar(-speedDelta),
    );
  keyboard["KeyD"] &&
    playerVelocity.add(
      getSideVector(camera, playerDirection).multiplyScalar(speedDelta),
    );
  keyboard["KeyW"] &&
    playerVelocity.add(
      getForwardVector(camera, playerDirection).multiplyScalar(speedDelta),
    );
  keyboard["KeyS"] &&
    playerVelocity.add(
      getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta),
    );
  if (playerOnFloor) {
    if (keyboard["Space"]) {
      playerVelocity.y = 15;
    }
  }
}

function updatePlayer(
  camera: Camera,
  delta: number,
  octree: Octree,
  capsule: Capsule,
  playerVelocity: Vector3,
  playerOnFloor: boolean,
) {
  let damping = Math.exp(-4 * delta) - 1;
  if (!playerOnFloor) {
    playerVelocity.y -= GRAVITY * delta;
    damping *= 0.1; // small air resistance
  }
  playerVelocity.addScaledVector(playerVelocity, damping);
  const deltaPosition = playerVelocity.clone().multiplyScalar(delta);
  capsule.translate(deltaPosition);
  playerOnFloor = playerCollisions(capsule, octree, playerVelocity);
  camera.position.copy(capsule.end);
  return playerOnFloor;
}

function throwBall(
  camera: Camera,
  capsule: Capsule,
  colliders: Collider[],
  playerDirection: Vector3,
  playerVelocity: Vector3,
  count: number,
) {
  const collider = colliders[count % ballCount];

  if (!collider) {
    console.error(`Missing collider ${count % ballCount}`);
    return;
  }

  camera.getWorldDirection(playerDirection);

  collider
    .sphere!.center.copy(capsule.end)
    .addScaledVector(playerDirection, capsule.radius * 1.5);

  collider.velocity.copy(playerDirection).multiplyScalar(50);
  collider.velocity.addScaledVector(playerVelocity, 2);
}

function playerCollisions(
  capsule: Capsule,
  octree: Octree,
  playerVelocity: Vector3,
) {
  const result = octree.capsuleIntersect(capsule);
  let playerOnFloor = false;
  if (result) {
    playerOnFloor = result.normal.y > 0;
    if (!playerOnFloor) {
      playerVelocity.addScaledVector(
        result.normal,
        -result.normal.dot(playerVelocity),
      );
    }
    capsule.translate(result.normal.multiplyScalar(result.depth));
  }
  return playerOnFloor;
}

function teleportPlayerIfOob(
  camera: Camera,
  capsule: Capsule,
  playerVelocity: Vector3,
) {
  if (camera.position.y <= -100) {
    playerVelocity.set(0, 0, 0);
    capsule.start.set(0, 10, 0);
    capsule.end.set(0, 11, 0);
    camera.position.copy(capsule.end);
    camera.rotation.set(0, 0, 0);
  }
}

export default function Player({
  octree,
  colliders,
}: {
  octree: Octree;
  colliders: Collider[];
}) {
  const playerOnFloor = useRef(false);
  const playerVelocity = useMemo(() => new Vector3(), []);
  const playerDirection = useMemo(() => new Vector3(), []);
  const capsule = useMemo(
    () => new Capsule(new Vector3(0, 10, 0), new Vector3(0, 11, 0), 0.5),
    [],
  );
  const keyboard = useKeyboard();
  const { camera } = useThree();
  let clicked = 0;

  const onPointerDown = () => {
    throwBall(
      camera,
      capsule,
      colliders,
      playerDirection,
      playerVelocity,
      clicked++,
    );
  };
  useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  });

  useEffect(() => {
    //console.log('adding reference to this capsule collider')
    colliders[ballCount] = { capsule: capsule, velocity: playerVelocity };
  }, [colliders, ballCount, capsule, playerVelocity]);

  useFrame(({ camera }, delta) => {
    controls(
      keyboard,
      camera,
      delta,
      playerVelocity,
      playerOnFloor.current,
      playerDirection,
    );
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME;
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(
        camera,
        deltaSteps,
        octree,
        capsule,
        playerVelocity,
        playerOnFloor.current,
      );
    }
    teleportPlayerIfOob(camera, capsule, playerVelocity);
  });

  return <Gltf src={suspend(suzi)} receiveShadow castShadow />;
}
