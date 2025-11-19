export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    pageSizes?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}