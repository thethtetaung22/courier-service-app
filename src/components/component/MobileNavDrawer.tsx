"use client"

import React, { useState } from 'react'
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui'
import { CalendarDays, CarFront, HomeIcon, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'

const MobileNavDrawer = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClick = (route: string) => {
        setOpen(false);
        router.push(route)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Button variant={'ghost'} className='p-0' >
                    <Menu className='text-white' />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                    <SheetTitle>Courier Service</SheetTitle>
                </SheetHeader>
                <div className='grid gap-2 w-full mt-8'>
                    <Button variant={'ghost'} onClick={() => handleClick('/')} className='bg-gray-300 py-2 px-4 rounded-xl flex justify-start items-center gap-2'>
                        <HomeIcon className="h-4 w-4" />
                        <span>Dashboard</span>
                    </Button>
                    <Button variant={'ghost'} onClick={() => handleClick('/vehicles')} className='bg-gray-300 py-2 px-4 rounded-xl flex justify-start items-center gap-2'>
                        <CarFront className="h-4 w-4" />
                        <span>Vehicles</span>
                    </Button>
                    <Button variant={'ghost'} onClick={() => handleClick('/maintenance')} className='bg-gray-300 py-2 px-4 rounded-xl flex justify-start items-center gap-2'>
                        <CalendarDays className="h-4 w-4" />
                        <span>Maintenance</span>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNavDrawer;
