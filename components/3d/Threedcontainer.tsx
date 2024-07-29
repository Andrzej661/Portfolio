import React, { Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Earth from "./Earth"

function Threedcontainer() {
  return (
    <div className="flex h-full w-[320px] justify-center sm:min-h-[400px] md:min-w-[500px] lg:min-h-[500px] lg:justify-start">
      <Canvas>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[-2, 7, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  )
}
export default Threedcontainer
