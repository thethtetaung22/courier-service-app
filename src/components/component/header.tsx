import React from 'react'
import { Package2Icon } from 'lucide-react'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui';

const Header = () => {

    return (
        <header className="flex justify-between lg:justify-end min-h-[60px] items-center gap-4 border-b bg-[#000000] px-6">
            <Link href="#" className="text-[#fff] lg:hidden" prefetch={false}>
                <Package2Icon className="h-6 w-6" />
                <span className="sr-only">Home</span>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="rounded-full border border-gray-200 w-8 h-8 bg-[#dcdcdc]">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='bg-[#ffffff]'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='hover:bg-[#474747] cursor-pointer'>Profile</DropdownMenuItem>
                    <DropdownMenuSeparator className='bg-[#cfcfcf]' />
                    <DropdownMenuItem className='hover:bg-[#cfcfcf] cursor-pointer'>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

export default Header;
