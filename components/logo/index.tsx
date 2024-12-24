import Image from "next/image";
import Link from "next/link";

export default function LogoComponent() {
  return (
    <Link
      href="/"
      className="flex flex-col items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white"
    >
      <div className="rounded-full mb-2 w-[250px] h-[250px]">
        <Image
          className="object-cover"
          src="/logo_img.png"
          alt="logo"
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
      <span> QuickBack Shopping</span>
    </Link>
  );
}
