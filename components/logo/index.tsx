import Image from "next/image";
import Link from "next/link";

export default function LogoComponent() {
  return (
    <Link
      href="/"
      className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white"
    >
      <Image
        className="w-8 h-4 mr-2"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
        layout="responsive"
        width={420}
        height={150}
      />
      QuickBack Shopping
    </Link>
  );
}
