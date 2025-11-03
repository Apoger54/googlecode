'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// A simple fallback component to show while the 3D scene is loading
// or if WebGL is not supported.
const FallbackScene = () => (
  <div
    className="flex min-h-[60vh] md:min-h-screen w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 text-center"
    style={{
      backgroundImage: `linear-gradient(rgba(8, 21, 43, 0.7) 0%, rgba(8, 21, 43, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQBbuMBXNMFuhcHvj2N_MtlYSOPZ1_-LoblPtGJOGvrNXqfTgytQn7xiB1ZTpbacL3Etp_IyWy9CaX1c2J7KcFfs_YPBws0g3EnHfVp3vVW24pDpRUgGVgmBVFQBpF2OrCwwK4XngUxQXsOrwk8QLo6xFDy5AzeNS-gSRh__C6aXnInhWl8Yb5iDtDo5Xgx4Aa8t565YEsoihtqaEERGENOTm0aSdO-56sa1g6A1sC8l_ZFCMSdsQBaDSvcGKGDAEgmmlElmYNONk")`,
    }}
    aria-label="Alanya coastline"
  />
);

// This is a placeholder 3D box that will be replaced with the actual coastline model.
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="teal" />
      </mesh>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};


const Header3D = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen -z-10">
        <Suspense fallback={<FallbackScene />}>
            <Canvas>
                <Scene />
            </Canvas>
        </Suspense>
    </div>
  );
};

export default Header3D;
