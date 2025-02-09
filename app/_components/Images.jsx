"use client"
import { useEffect, useRef, useState } from "react";
import ImagesColumn from "./ImagesColumn";
import Spinner from "./Spinner";
import { getNftImage, getNftImages } from "../_lib/imageNftsAPI";

export default function Images() {
  const refs = [useRef(), useRef(), useRef()]
  const columnNum = 3
  let refsHeight = useRef(null)

  const maxRefs = (refs) => refs.reduce((a, b) => Math.max(a, b))
  const minRefs = (refs) => refs.reduce((a, b) => Math.min(a, b))

  useEffect(() => {
    refsHeight.current = refs?.map(ref => ref?.current?.getBoundingClientRect().height)

  }, [refs])


  const timeoutRef = useRef(null)
  let pageNum = 1
  let temp = 1000

  const [isLoading, setIsLoading] = useState(false)
  const [nftImages, setNftImages] = useState(Array.from({ length: columnNum }, () => []))
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
      const columns = Array.from({ length: columnNum }, () => [])

      filterNftImages(data).forEach((img, i) => {
        columns[i % columnNum]?.push(img)
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

    const data = await getNftImages(12, pageNum)
    const newImages = filterNftImages(data)
    let newColumns = Array.from({ length: columnNum }, () => [])
    // console.log(newImages);

    newImages.forEach((img, i) => {
      if (maxRefs(refsHeight.current) - minRefs(refsHeight.current) > 1500) {
        if (refsHeight.current[i % columnNum] == minRefs(refsHeight.current)) newColumns[i % columnNum].push(img)
      } else newColumns[i % columnNum].push(img)
    })

    setNftImages(prevColumns => prevColumns.map((item, i) => [...item, ...newColumns[i]]))

    setIsLoading(false)
  }

  useEffect(() => {
    function handleScroll() {
      if (timeoutRef.current) return

      timeoutRef.current = setTimeout(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - temp) {
          temp = temp + 50
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
            <ImagesColumn ref={refs[i]} images={column} key={i} />
          ))
        }
      </div>
      {isLoading && <Spinner />}
    </>
  );
}
