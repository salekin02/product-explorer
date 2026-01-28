import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Column, TableProps } from '../../types/table';
import { TableSkeleton } from './TableSkeleton';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>({ data, columns, sortKey, sortDirection, onSort, loading = false, isError = false, error = null, className = '' }: TableProps<T>) {
    const handleSort = (column: Column<T>) => {
        if (column.sortable && onSort) {
            onSort(column.key);
        }
    };

    if (isError) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto text-center">
                    <h2 className="text-lg font-semibold text-red-800 mb-2">
                        {error instanceof Error ? error.message : 'An unexpected error occurred'}
                    </h2>
                    <p className="text-red-600 text-sm">
                        Please try refreshing the page or come back later.
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={`overflow-x-auto ${className}`}>
                <table className="w-full border-collapse bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${column.className || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <TableSkeleton columns={columns.length} rows={10} />
                </table>
            </div>
        );
    }

    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="w-full border-collapse bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                                    } ${column.className || ''}`}
                                onClick={() => handleSort(column)}
                            >
                                <div className="flex items-center gap-1">
                                    {column.header}
                                    {column.sortable && (
                                        <span className="flex flex-col">
                                            <ChevronUp
                                                className={`w-3 h-3 ${sortKey === column.key && sortDirection === 'asc'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                            <ChevronDown
                                                className={`w-3 h-3 -mt-1 ${sortKey === column.key && sortDirection === 'desc'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data && data.length ? 
                    data.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className={`px-4 py-3 text-sm text-gray-700 ${column.className || ''}`}
                                >
                                    {column.render ? column.render(item) : item[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                :
                  <tr>
                    <td colSpan={columns.length} className="text-gray-500 py-8 text-sm text-center">
                        No data available
                    </td>
            </tr>
                }
                </tbody>                
            </table>
        </div>
    );
}
