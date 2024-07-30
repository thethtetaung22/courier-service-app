'use client'

import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const TablePagination = ({
    total
}: {
    total?: number
}) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const [totalPage, setTotalPage] = useState(1);
    const [pageIndex, setPageIndex] = useState<number>(1);

    const handleItemClick = (i: number) => {
        setPageIndex(i);
        params.set('page', i.toString());
        router.replace(`${pathName}?${params.toString()}`);
    }

    const handlePrev = () => {
        if (pageIndex > 1) {
            const index = pageIndex - 1;
            setPageIndex(index);
            params.set('page', index.toString());
            router.replace(`${pathName}?${params.toString()}`);
        }
    }

    const handleNext = () => {
        if (pageIndex < totalPage) {
            const index = pageIndex + 1;
            setPageIndex(index);
            params.set('page', index.toString());
            router.replace(`${pathName}?${params.toString()}`);
        }
    }

    useEffect(() => {
        const page = params.get('page')

        if (page) {
            setPageIndex(Number(page));
        }
        setTotalPage(total ? Math.ceil(total / 8) : 1)
    }, [total])

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePrev} className={cn(
                        `cursor-pointer disabled`,
                        pageIndex < 2 && 'text-gray-400 hover:text-gray-400'
                    )} />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink className='cursor-pointer' onClick={() => handleItemClick(1)} isActive={pageIndex === 1}>1</PaginationLink>
                </PaginationItem>

                {
                    pageIndex > 2 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }

                {
                    pageIndex > 1 && pageIndex < totalPage && <PaginationItem>
                        <PaginationLink isActive>{pageIndex}</PaginationLink>
                    </PaginationItem>
                }
                {
                    pageIndex + 1 < totalPage &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                {
                    totalPage > 1 &&
                    <PaginationItem>
                        <PaginationLink className='cursor-pointer' isActive={pageIndex === totalPage} onClick={() => handleItemClick(totalPage)}>{totalPage}</PaginationLink>
                    </PaginationItem>
                }
                <PaginationItem>
                    <PaginationNext onClick={handleNext} className={cn(
                        `cursor-pointer disabled`,
                        pageIndex === totalPage && 'text-gray-400 hover:text-gray-400'
                    )} />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}

export default TablePagination;
