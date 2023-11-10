"use client";

import { Suspense, useState } from "react";
import {
  PerformanceMonitor,
  PointerLockControls,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";

import Physics from "./physics";

export const Gravity = 30;
export const ballCount = 100;
export const radius = 0.2;
export const balls = [...Array(ballCount)].map(() => ({
  position: [Math.random() * 50 - 25, 20, Math.random() * 50 - 25],
}));
export const v1 = new Vector3();
export const v2 = new Vector3();
export const v3 = new Vector3();
export const frameSteps = 5;

export default function Game() {
  const [dpr, setDpr] = useState(0.5);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Canvas shadows dpr={dpr}>
        <PerformanceMonitor
          onIncline={() => setDpr(1)}
          onDecline={() => setDpr(0.25)}
        >
          <Stats />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <directionalLight
            intensity={1}
            castShadow={true}
            shadow-bias={-0.00015}
            shadow-radius={4}
            shadow-blur={10}
            shadow-mapSize={[2048, 2048]}
            position={[85.0, 80.0, 70.0]}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          <Physics />
          <PointerLockControls />
        </PerformanceMonitor>
      </Canvas>
    </Suspense>
  );
}
