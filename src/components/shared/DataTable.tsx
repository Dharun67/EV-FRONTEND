import React from 'react';

interface DataTableProps {
  columns: { key: string; label: string; align?: 'left' | 'right' | 'center'; hiddenOnMobile?: boolean }[];
  data: any[];
  renderCell: (item: any, columnKey: string) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, renderCell }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.hiddenOnMobile ? 'hidden sm:table-cell' : ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                {columns.map((col) => (
                  <td 
                    key={col.key} 
                    className={`px-6 py-4 ${
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                    } ${col.hiddenOnMobile ? 'hidden sm:table-cell' : ''}`}
                  >
                    {renderCell(row, col.key)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500 font-medium">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
