import { useRouter } from "next/navigation";
import BasicButton from "../button/basic-button";
import Link from "next/link";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="bg-white rounded-lg relative dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
      <div className="py-6 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-[10] relative">
        <a
          href="/product"
          className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          <span className="text-xs block h-full bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
            Mới
          </span>{" "}
          <span className="text-sm font-sm">
            Hoàn tiền lên tới 20%. Xem ngay!
          </span>
          <svg
            className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
        <h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cam kết hoàn lại tiền thật
        </h1>
        <p className="mb-8 text-medium font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Chia sẻ hoa hồng từ đối tác, giúp bạn nhận tiền trực tiếp vào tài
          khoản ngân hàng một cách minh bạch và an tâm.
        </p>
        <form className="w-full max-w-md mx-auto">
          <label
            htmlFor="default-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Email sign-up
          </label>
          <div className="relative">
            <div className="inset-y-0 rtl:inset-x-0 flex items-center ps-3.5">
              <Link href={"/product"} className="w-full">
                <BasicButton
                  text="Tham gia ngay"
                  variant="basic"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0" />
    </section>
  );
}
