type TableProps = {
  title: string;
  data: {
    id: string;
    [key: string]: string;
  }[];
};

export function Table({ title, data }: TableProps) {
  if (data.length === 0) {
    return null;
  }

  const first = data[0];
  const headers = first ? Object.keys(first) : [];
  const rows = data.map((d) => Object.values(d));

  return (
    <>
      <h1 className="mt-2 text-center text-2xl">{title}</h1>
      <div className="container mb-6 max-h-64 w-full overflow-auto">
        <table className="w-full truncate whitespace-nowrap text-left text-gray-500 text-sm rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.slice(1).map((header) => (
                <th className="px-6 py-3" key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                className="border-gray-200 border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={JSON.stringify(row)}
              >
                {row.slice(1).map((col) => (
                  <td className="px-6 py-4" key={col}>
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
