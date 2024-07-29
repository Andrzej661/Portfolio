import React from "react"
import Image, { StaticImageData } from "Next/Image"
type PhotosProp = {
  imgSrc: StaticImageData
}
const Photos: React.FC<PhotosProp> = ({ imgSrc }) => {
  return <Image src={imgSrc} alt="Logo" />
}

export default Photos
