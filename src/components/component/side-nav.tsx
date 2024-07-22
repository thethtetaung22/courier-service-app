'use client'

import { CalendarDays, CarFront, HomeIcon, Mountain } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { cn } from '@/lib/utils';

const SideNav = () => {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-gray-100/40 lg:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6 gap-4 bg-black">
                    <Link href="#" className="flex items-center gap-2 font-semibold text-white" prefetch={false}>
                        <Mountain className="h-6 w-6" />
                        <span className="">Courier Service</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium gap-1">
                        <Link
                            href="/"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                pathname === '/' && 'bg-gray-200 px-3 py-2 text-gray-900'
                            )}
                            prefetch={false}
                        >
                            <HomeIcon className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/vehicles"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                pathname === '/vehicles' && 'bg-gray-200 px-3 py-2 text-gray-900'
                            )}
                            prefetch={false}
                        >
                            <CarFront className="h-4 w-4" />
                            Vehicles
                        </Link>
                        <Link
                            href="/schedules"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                pathname === '/schedules' && 'bg-gray-200 px-3 py-2 text-gray-900'
                            )}
                            prefetch={false}
                        >
                            <CalendarDays className="h-4 w-4" />
                            Schedules
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SideNav;
