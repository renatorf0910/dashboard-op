"use client"

import React from "react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "./pagination"
import { PaginationProps } from "@/domain/types/pagination/PaginationProps";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "./select";

export function PaginationWithSize({ currentPage, totalPages, pageSize, pageSizes = [5, 10, 15, 20], onPageChange, onPageSizeChange, }: PaginationProps) {
    const renderPages = () => {
        const items = [];

        for (let i = 0; i < totalPages; i++) {
            const isNear =
                i === 0 ||
                i === totalPages - 1 ||
                i === currentPage ||
                i === currentPage - 1 ||
                i === currentPage + 1;

            if (isNear) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === currentPage}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(i);
                            }}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                items.push(
                    <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }
        return items;
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 0) onPageChange(currentPage - 1);
                            }}
                            className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {renderPages()}

                    <PaginationItem>
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
                            }}
                            className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
            <Select
                value={String(pageSize)}
                onValueChange={(value) => onPageSizeChange(Number(value))}
            >
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {pageSizes.map((size) => (
                        <SelectItem key={size} value={String(size)}>
                            {size} rows
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
