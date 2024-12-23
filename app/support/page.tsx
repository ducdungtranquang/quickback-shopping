"use client";
import Accordion from "@/components/accordion/accordion";
import InfoCard from "@/components/card/info-card";
import useAuth from "@/hook/useAuth";
import Footer from "@/layout/app/footer";
import NavBar from "@/layout/app/navbar";

export default function SupportPage() {
  const { isAuthenticated } = useAuth(false);

  const accordionItems = [
    {
      id: "1",
      title: "Điều kiện hoàn tiền là gì?",
      content: (
        <div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built
            on top of Tailwind CSS including buttons, dropdowns, modals,
            navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to{" "}
            <a
              href="/docs/getting-started/introduction/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              get started
            </a>{" "}
            and start developing websites even faster with components on top of
            Tailwind CSS.
          </p>
        </div>
      ),
    },
    {
      id: "2",
      title: "Tại sao tôi không rút được tiền dù đạt yêu cầu",
      content: (
        <div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma
            software so everything you see in the library has a design
            equivalent in our Figma file.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the{" "}
            <a
              href="https://flowbite.com/figma/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Figma design system
            </a>{" "}
            based on the utility classes from Tailwind CSS and components from
            Flowbite.
          </p>
        </div>
      ),
    },
    {
      id: "3",
      title: "Thời gian nhận tiền là bao lâu?",
      content: (
        <div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            The main difference is that the core components from Flowbite are
            open source under the MIT license, whereas Tailwind UI is a paid
            product.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[100px]">
        <h1 className="text-xl font-medium text-black sm:text-xl md:text-2xl text-center mt-4">
          Hỗ trợ
        </h1>
        <div className="py-5 px-2">
          <h2 className="text-normal font-medium text-black sm:text-xl px-1 sm:text-center my-2">
            Các vấn đề thường gặp
          </h2>
          <Accordion items={accordionItems} />
        </div>
        <div className="py-5 px-2">
          <h2 className="text-normal font-medium text-black sm:text-xl px-1 sm:text-center my-2">
            Tư vấn và hỗ trợ trực tiếp
          </h2>
          <div className="flex flex-wrap gap-[10px]">
            <InfoCard message={"Thông tin cá nhân"} link="/profile" />
            <InfoCard message={"Liên hệ trực tiếp"} link="/" />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
