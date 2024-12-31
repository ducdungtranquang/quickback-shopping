import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import ProductTable from "./product-table";

const projects = [
  {
    name: "Sản phẩm",
    initials: "SP",
    href: "https://docs.google.com/spreadsheets/d/1OpWGJl7Kf67_XDQZtU20MaT9TJEs7noAju5oiYX7nE0/edit?gid=0#gid=0",
    // members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Cửa hàng",
    initials: "Shop",
    href: "https://docs.google.com/spreadsheets/d/1OpWGJl7Kf67_XDQZtU20MaT9TJEs7noAju5oiYX7nE0/edit?gid=0#gid=0",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Website",
    initials: "WEB",
    href: "#",
    // members: 0,
    bgColor: "bg-yellow-500",
  },
  {
    name: "Khác",
    initials: "O",
    href: "#",
    // members: 0,
    bgColor: "bg-green-500",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductAdmin() {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Quản lý sản phẩm</h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {projects.map((project) => (
          <li
            key={project.name}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div
              className={classNames(
                project.bgColor,
                "flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            >
              {project.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={project.href}
                  target="_blank"
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {project.name}
                </a>
                {/* <p className="text-gray-500">{project.members} sản phẩm</p> */}
              </div>
              <div className="shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Mở</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ProductTable />
    </div>
  );
}
