"use client"

import React, { useEffect, ReactNode } from "react"
import * as THREE from "three"

interface ParticlesBackgroundProps {
  children?: ReactNode
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  children
}) => {
  useEffect(() => {
    let camera: THREE.PerspectiveCamera
    let scene: THREE.Scene
    let renderer: THREE.WebGLRenderer
    let particles: THREE.Points

    init()
    animate()

    function init() {
      const container = document.getElementById("particlesBackground")
      if (!container) return

      container.style.position = "fixed"
      container.style.top = "0"
      container.style.left = "0"
      container.style.width = "100%"
      container.style.height = "100%"
      container.style.zIndex = "-1"
      container.style.opacity = "0.25"
      container.style.pointerEvents = "none"

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        3000
      )
      camera.position.z = 1000

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x000000, 0.0007)

      const geometry = new THREE.BufferGeometry()
      const vertices = []
      const particleCount = 10000
      for (let i = 0; i < particleCount; i++) {
        vertices.push(
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000
        )
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      )
      const material = new THREE.PointsMaterial({ color: 0x888888 })
      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      window.addEventListener("resize", onWindowResize, false)
      document.addEventListener("scroll", onScroll, false)
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate() {
      requestAnimationFrame(animate)
      // Slow rotation from left to right
      particles.rotation.y += 0.00005
      renderer.render(scene, camera)
    }

    function onScroll() {
      // Adjust the camera position based on window scroll to create a parallax effect
      const scrollY = window.scrollY
      camera.position.y = -scrollY * 0.05 // Move slower than the scroll
    }

    return () => {
      window.removeEventListener("resize", onWindowResize)
      document.removeEventListener("scroll", onScroll)
      const container = document.getElementById("particlesBackground")
      if (container) {
        container.removeChild(renderer.domElement)
      }
      scene.clear()
      renderer.dispose()
    }
  }, [])

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      <div id="particlesBackground"></div>
      {children}
    </div>
  )
}

export default ParticlesBackground
