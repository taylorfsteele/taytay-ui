import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { table as tableStyles } from "./PropsTable.module.css";

type DataDefinitions = {
  name: string;
  type: string;
  description: string;
};

const columnHelper = createColumnHelper<DataDefinitions>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("type", {
    cell: (info) => info.getValue(),
    header: "Type",
  }),
  columnHelper.accessor("description", {
    cell: (info) => info.getValue(),
    header: "Description",
  }),
];

export const PropsTable = ({ data }: { data: DataDefinitions[] }) => {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
  });

  return (
    <table className={tableStyles}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
