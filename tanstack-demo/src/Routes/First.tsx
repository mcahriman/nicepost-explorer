import {
  ColumnHelper,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useState } from "react";

type Props = {};
type Cat = {
  id: string;
  name: string;
  age: number;
  breed: string;
  exists: boolean;
};

const cats: Cat[] = [
  { id: "c1", name: "Kot", age: 11, breed: "tabby", exists: true },
  { id: "c2", name: "Teenja", age: 3, breed: "tabby", exists: true },
  { id: "c3", name: "Sofi", age: 1, breed: "white-tabby", exists: true },
  { id: "c4", name: "Puk", age: 11, breed: "Tiger", exists: false },
  { id: "c5", name: "Srenk", age: 11, breed: "Abrams", exists: false },
  { id: "c6", name: "Tydym", age: 11, breed: "Challenger", exists: false },
  { id: "c7", name: "Kaban", age: 11, breed: "Leclerc/", exists: false },
];
const columnHelper: ColumnHelper<Cat> = createColumnHelper<Cat>();
const columns = [
  columnHelper.display({
    id: "Name",
    cell: (p) => <div>{p.row.original.name}</div>,
  }),

  columnHelper.display({
    id: "Name",
    cell: (p) => <div>{p.row.original.breed}</div>,
  }),

  columnHelper.display({
    id: "Name",
    cell: (p) => <div>{p.row.original.age}</div>,
  }),
];

const First = (props: Props) => {
  const [data, setData] = useState(() => [...cats]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      {table.getRowModel().rows.map((r) => (
        <div key={r.id}>
          {r.getVisibleCells().map((c) => (
            <div key={c.id}>
              {flexRender(c.column.columnDef.cell, c.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default First;
