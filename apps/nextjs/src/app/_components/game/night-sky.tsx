import { useCubeTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import {
  BackSide,
  FileLoader,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
} from "three";

export function NightSky() {
  const skyVertexShader = useLoader(
    FileLoader,
    "/assets/shaders/sky.vert",
  ) as string;
  const skyFragmentShader = useLoader(
    FileLoader,
    "/assets/shaders/sky.frag",
  ) as string;

  const background = useCubeTexture(
    [
      "sky/Cold_Sunset__Cam_2_Left+X.png",
      "sky/Cold_Sunset__Cam_3_Right-X.png",
      "sky/Cold_Sunset__Cam_4_Up+Y.png",
      "sky/Cold_Sunset__Cam_5_Down-Y.png",
      "sky/Cold_Sunset__Cam_0_Front+Z.png",
      "sky/Cold_Sunset__Cam_1_Back-Z.png",
    ],
    { path: "/assets/" },
  );

  const stars = useCubeTexture(
    [
      "sky/space-posx.jpg",
      "sky/space-negx.jpg",
      "sky/space-posy.jpg",
      "sky/space-negy.jpg",
      "sky/space-posz.jpg",
      "sky/space-negz.jpg",
    ],
    { path: "/assets/" },
  );

  const skyGeo = new SphereGeometry(1000, 32, 15);
  const skyMat = new ShaderMaterial({
    uniforms: {
      background: {
        value: background,
      },
      stars: {
        value: stars,
      },
    },
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    side: BackSide,
  });

  return <mesh args={[skyGeo, skyMat]} />;
}
