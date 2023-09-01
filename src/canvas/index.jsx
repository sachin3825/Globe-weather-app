import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Globe from "./Globe";
const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2] }}
      gl={{ preserveDrawingBuffer: true }}
      className='w-full max-w-full h-screen transition-all ease-in'
    >
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </Canvas>
  );
};

export default CanvasModel;
