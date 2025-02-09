export const BASE_URL = 'https://api.seed.photo/api/Nfts/Explore'
// export const BASE_IMAGE_URL = 'https://s3.seed.photo/media'
export const BASE_IMAGE_URL = 'https://seed.photo/cdn-cgi/image/width=400,quality=75,format=webp/https://s3.seed.photo/optimized_media'


export async function getNftImages(count, page = 1) {
  try {
    const res = await fetch(`${BASE_URL}?PageNumber=${page}&PageSize=${count}`)
    const data = await res.json()

    return data.Data
  } catch (error) {
    throw new Error(error)
  }
}

export function getNftImage(imageUrl) {
  const nftImageUrl = `${BASE_IMAGE_URL}/${imageUrl}`

  return nftImageUrl
}