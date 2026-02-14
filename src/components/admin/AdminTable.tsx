"use client";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  getKey: (item: T) => string;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

export default function AdminTable<T>({
  title,
  columns,
  data,
  getKey,
  onDelete,
  loading,
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ocean-900">{title}</h1>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ocean-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 font-semibold text-ocean-700"
                >
                  {col.label}
                </th>
              ))}
              {onDelete && (
                <th className="px-4 py-3 font-semibold text-ocean-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-ocean-400"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={getKey(item)}
                  className="border-b border-ocean-50 hover:bg-ocean-50/50"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-ocean-800">
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                  {onDelete && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onDelete(item)}
                        className="text-sm text-coral-600 hover:text-coral-800"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
