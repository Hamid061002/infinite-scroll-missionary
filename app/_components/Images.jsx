import ImagesColumn from "./ImagesColumn";

export default function Images() {
  const imagesColumns = 4

  return (
    <>
      <div className="flex items-start gap-5 place-content-center">
        {
          Array.from({ length: imagesColumns }, (_, i) =>
            <ImagesColumn key={i} />
          )
        }
      </div>
    </>
  );
}
