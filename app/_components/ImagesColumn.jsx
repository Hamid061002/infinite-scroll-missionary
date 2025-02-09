// "use client"


import { useEffect, useRef, useState } from "react"
import { getImages } from "../_lib/imageAPI"
import { getNftImage, getNftImages } from "../_lib/imageNftsAPI"

export default function ImagesColumn({ images, ref }) {  
  // const [nftImages, setNftImages] = useState([])

  // function filterNftImages(data) {
  //   return data.map(item => item.Nft.ImageUrl)
  //     .map(item => getNftImage(item))
  //     .filter(item => !item.includes('mp4'))
  //     .sort((a, b) => 0.5 - Math.random())
  // }

  // useEffect(() => {
  //   async function getData() {
  //     setIsLoading(true)
  //     const data = await getNftImages(20, 1)
  //     const temp = filterNftImages(data)
  //     setNftImages(() => temp)
  //     setIsLoading(false)
  //   }
  //   getData()
  // }, [])

  // async function addNftImages() {
  //   if (isLoading) return
  //   setIsLoading(true)
  //   const data = await getNftImages(10)
  //   const newImages = filterNftImages(data)
  //   setNftImages(images => [...images, ...newImages])

  //   if (document.body.offsetHeight - ref.current.offsetHeight > 200) {
  //     const data = await getNftImages(10)
  //     const newImages = filterNftImages(data)
  //     setNftImages(images => [...images, ...newImages])
  //     setIsLoading(false)
  //   }
  //   setIsLoading(false)
  // }

  // function addImages() {
  //   const newImages = getImages(3)
  //   setImages(images => [...images, ...newImages])

  //   if (document.body.offsetHeight - ref.current.offsetHeight > 200) {
  //     const newImages = getImages(3)
  //     setImages(images => [...images, ...newImages])
  //   }
  // }

  // useEffect(() => {
  //   function handleScroll() {
  //     if (timeoutRef.current) return

  //     timeoutRef.current = setTimeout(() => {
  //       if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500) {
  //         // addImages()
  //         addNftImages()
  //       }
  //       timeoutRef.current = null
  //     }, 1000);
  //   }

  //   document.addEventListener('scroll', handleScroll)
  //   return () => document.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <div ref={ref} className="flex flex-col gap-5 h-fit">
      {
        images?.map((image, i) => image.includes('mp4') ? <div key={i} className="bg-black w-full h-[350px]"></div> :
          <img key={i} src={image} alt="image" />)
      }
      <div className="bg-neutral-400 animate-pulse w-full h-[350px]"></div>
    </div>
  )
}
