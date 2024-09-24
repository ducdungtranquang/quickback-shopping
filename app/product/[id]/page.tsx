"use client";
import NavBar from "@/layout/navbar";

/* eslint-disable @next/next/no-img-element */
export default function ProductPage() {
  return (
    <>
      <NavBar />
      <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-[100px] h-full min-h-screen p-4">
        <div className="max-w-full mx-auto px-4 md:px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-2 sm:px-0">
              <div className="md:h-[360px] h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="text-[16px] w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Mua
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="text-[16px] w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Lưu
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Tên sản phẩm
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                ABC Test
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Cửa hàng
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                ABC
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Danh mục
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Clothes - Test -Test
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Giá:{" "}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    $29.99
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Hoàn:{" "}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">1%</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Lưu ý:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
