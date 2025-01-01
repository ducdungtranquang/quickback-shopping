import WithDrawTable from "./withdraw-table";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lindsay.walton@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function RequirementAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Yêu cầu</h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách yêu cầu rút tiền
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <WithDrawTable />
      </div>
    </div>
  );
}
