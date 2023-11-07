import { Decal, Float, useTexture } from "@react-three/drei";

export default function Ball({ radius }: { radius: number }) {
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[radius, 5]} />
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
        />
      </mesh>
    </Float>
  );
}
