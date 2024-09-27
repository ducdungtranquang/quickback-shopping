interface IProgressCard {
  title: string;
  des: string;
  src: string;
}

export default function ProgressCard({ title, des, src }: IProgressCard) {
  return (
    <div className="p-3 border-1 rounded-xl">
      <div className="w-full flex justify-between sm:items-center flex-col sm:flex-row">
        <div>
          <div className="mb-3 text-base text-gray-400 dark:text-white">
            {title}
          </div>
          <div className="mb-3 text-base dark:text-white">{des}</div>
          <div className="w-[50%] min-w-[200px] bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div className="bg-green-400 h-2.5 rounded-full dark:bg-blue-500" />
          </div>
        </div>
        <div className="">
          <img src={src} alt="flower" className="w-[60px] h-[60px]" />
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full h-[1px]" />
    </div>
  );
}
