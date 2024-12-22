import Link from "next/link";

export default function Gallery() {
  return (
    <div className="grid gap-4">
      <Link href={"/shop"}>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
          alt=""
        />
      </Link>
      <div className="grid grid-cols-5 gap-4">
        <Link href={"/shop"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
            alt=""
          />
        </Link>
        <Link href={"/shop"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
            alt=""
          />
        </Link>
        <Link href={"/shop"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
            alt=""
          />
        </Link>
        <Link href={"/shop"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
            alt=""
          />
        </Link>
        <Link href={"/shop"}>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
