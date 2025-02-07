const IMAGE_URL = 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry'

export function getImages(count) {
  const randomIds = Array.from({ length: count }, (_, i) => Math.round(Math.random().toFixed(2) * 100) % 11 + 1)
  const imageUrls = randomIds.map(id => `${IMAGE_URL}/image-${id}.jpg`) 
  return imageUrls
}

