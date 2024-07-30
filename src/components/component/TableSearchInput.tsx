'use client'

import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Input } from '../ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TableSearchInput = () => {
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
        <div className="hidden sm:flex relative w-full w-2xl items-center">
            <SearchIcon className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
                type="search"
                placeholder="Search"
                onChange={handleSearchChange}
                defaultValue={params.get('query') || ''}
                className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
            />
        </div>
    )
}

export default TableSearchInput