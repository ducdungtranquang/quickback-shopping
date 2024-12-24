import Link from "next/link";

export default function GridGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="grid gap-4">
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
            alt=""
          />
        </Link>
      </div>
      <div className="grid gap-4">
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
            alt=""
          />
        </Link>
      </div>
      <div className="grid gap-4">
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
            alt=""
          />
        </Link>
      </div>
      <div className="grid gap-4">
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
            alt=""
          />
        </Link>
        <Link href={"/product"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
