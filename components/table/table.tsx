import { useRouter } from "next/navigation";
import React from "react";

export type TableColumn = {
  header: string;
  key: string;
};

export type TableRow = {
  [key: string]: string | number;
};

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  navigate?: string[];
}

const DataTable: React.FC<TableProps> = ({ columns, data, navigate }) => {
  const router = useRouter();
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th scope="col" className="px-6 py-3" key={column.key}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              {columns.map((column, i) => (
                <td
                  style={{
                    cursor:
                      i === 0 && navigate && navigate?.length > 0
                        ? "pointer"
                        : "",
                    textDecoration:
                      i === 0 && navigate && navigate?.length > 0
                        ? "underline"
                        : "",
                  }}
                  onClick={() => {
                    if (i === 0) {
                      if (navigate && navigate?.length > 0) {
                        router.push(`/product/${navigate[i]}`);
                      }
                    }
                  }}
                  key={column.key}
                  className="px-6 py-4"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
