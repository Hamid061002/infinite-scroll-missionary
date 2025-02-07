"use client"

import { useEffect, useRef, useState } from "react"
import { getImages } from "../_lib/imageAPI"

export default function ImagesColumn() {
  const [images, setImages] = useState(() => getImages(3))
  const ref = useRef()

  function addImages() {
    const newImages = getImages(3)
    setImages(images => [...images, ...newImages])

    if (document.body.offsetHeight - ref.current.offsetHeight > 200) {
      const newImages = getImages(3)
      setImages(images => [...images, ...newImages])
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500) {
        addImages()
      }
    })
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-5 h-fit">
      {images?.map((image, i) => <img key={i} src={image} alt="image" />)}
    </div>
  )
}
