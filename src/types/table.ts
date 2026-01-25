import type { ReactNode } from "react";

export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
    sortable?: boolean;
    className?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    sortKey?: string;
    sortDirection?: 'asc' | 'desc' | null;
    onSort?: (key: string) => void;
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
}
