"use client"
import { useEffect, useRef, useState } from "react";
import ImagesColumn from "./ImagesColumn";
import Spinner from "./Spinner";
import { getNftImage, getNftImages } from "../_lib/imageNftsAPI";

export default function Images() {
  const timeoutRef = useRef(null)
  let pageNum = 1
  let temp = 1000

  const [isLoading, setIsLoading] = useState(false)
  const [nftImages, setNftImages] = useState([[], [], [], []])
  // const [nftImages, setNftImages] = useState(() => Array.from({ length: imagesColumns }, () => []))

  function filterNftImages(data) {
    return data.map(item => item.Nft.ImageUrl)
      .sort((a, b) => Math.random() - 0.5)
      .map(item => getNftImage(item))
    // .filter(item => !item.includes('mp4'))
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const data = await getNftImages(12, pageNum)
      const columns = [[], [], [], []]

      filterNftImages(data).forEach((img, i) => {
        columns[i % 4].push(img)
      })
      pageNum++

      setNftImages(() => columns)
      setIsLoading(false)
    }
    getData()
  }, [])

  async function addNftImages() {
    if (isLoading) return
    pageNum++

    setIsLoading(true)

    const data = await getNftImages(8, pageNum)
    const newImages = filterNftImages(data)
    let newColumns = [[], [], [], []]
    newImages.forEach((img, i) => newColumns[i % 4].push(img))

    setNftImages(prevColumns => prevColumns.map((item,i) => [...item, ...newColumns[i]]))

    // setNftImages(prevColumns => {
    //   const updatedColumns = [...prevColumns]

    //   newImages.forEach((img, i) => {
    //     updatedColumns[i % 4].push(img)
    //   })

    //   return updatedColumns
    // })

    setIsLoading(false)
  }

  useEffect(() => {
    function handleScroll() {
      if (timeoutRef.current) return

      timeoutRef.current = setTimeout(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - temp) {
          temp = temp + 100
          addNftImages()
        }
        timeoutRef.current = null
      }, 2000);
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <>
      <div className="flex items-start gap-5 place-content-center">
        {
          nftImages.map((column, i) => (
            <ImagesColumn images={column} key={i} />
          ))
        }
      </div>
      {isLoading && <Spinner />}
    </>
  );
}
