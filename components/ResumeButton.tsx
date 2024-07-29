"use client"
import { Button } from "@nextui-org/react"
import React, { useState } from "react"

const ResumeButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/downloadResume")
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "resume.pdf")
      document.body.appendChild(link)
      link.click()
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
    } catch (error) {
      console.error("There was an error downloading the file:", error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      variant="ghost"
      onClick={handleDownload}
      size="md"
      isDisabled={isLoading}
      className="w-20 border-foreground px-3 font-bold text-foreground  sm:w-32  sm:px-5"
    >
      Resume
    </Button>
  )
}

export default ResumeButton
