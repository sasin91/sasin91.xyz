import * as React from "react";
import { Gltf } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { suspend } from "suspend-react";
import { Camera, Vector3 } from "three";

import useKeyboard from "~/app/hooks/useKeyboard";

const suzi = import("@pmndrs/assets/models/suzi.glb");

function getForwardVector(camera: Camera, direction: Vector3) {
  camera.getWorldDirection(direction);
  direction.y = 0;
  direction.normalize();

  return direction;
}

function getSideVector(camera: Camera, direction: Vector3) {
  camera.getWorldDirection(direction);
  direction.y = 0;
  direction.normalize();
  direction.cross(camera.up);

  return direction;
}

export default function Player() {
  const playerRef = React.useRef(null);
  const keyStates = useKeyboard();
  const direction = React.useMemo(() => new Vector3(), []);
  const velocity = React.useMemo(() => new Vector3(), []);
  const lookAt = React.useMemo(() => new Vector3(), []);
  const startPosition = React.useMemo(() => new Vector3(0, 2, -1), []);

  let moving = false;

  useFrame((state) => {
    // gives a bit of air control
    const speedDelta = state.clock.getDelta() * (keyStates["Space"] ? 25 : 8);

    if (keyStates["KeyW"]) {
      velocity.add(
        getForwardVector(state.camera, direction).multiplyScalar(speedDelta),
      );
      moving = true;
    }

    if (keyStates["KeyS"]) {
      velocity.add(
        getForwardVector(state.camera, direction).multiplyScalar(-speedDelta),
      );
      moving = true;
    }

    if (keyStates["KeyA"]) {
      velocity.add(
        getSideVector(state.camera, direction).multiplyScalar(-speedDelta),
      );
      moving = true;
    }

    if (keyStates["KeyD"]) {
      velocity.add(
        getSideVector(state.camera, direction).multiplyScalar(speedDelta),
      );
      moving = true;
    }
  });

  return (
    <group ref={playerRef} dispose={null} position={startPosition}>
      <mesh castShadow scale={[0.05, 0.05, 0.13]}></mesh>
      <Gltf src={suspend(suzi).default} />
    </group>
  );
}
