'use client'

import { SearchIcon } from 'lucide-react';
import React from 'react'
import { Input } from '../ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TableTemplate = ({
    title,
    actionButtons,
    children,
}: Readonly<{
    title: string;
    actionButtons: React.ReactNode;
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const handleSearchChange = (e: any) => {
        if (e.target.value?.length) {
            params.set('query', e.target.value);
            router.replace(`${pathName}?${params.toString()}`)
        } else {
            router.replace(`${pathName}`)
        }
    }

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg md:text-2xl">{title || 'Table'}</h1>
                <div className="flex gap-4 items-center">
                    <div className="hidden sm:flex relative w-full w-2xl items-center">
                        <SearchIcon className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search"
                            onChange={handleSearchChange}
                            className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
                        />
                    </div>
                    {actionButtons}
                </div>
            </div>
            {children}
        </div>
    )
}

export default TableTemplate