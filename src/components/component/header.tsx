import React from 'react'
import { Package2Icon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import {
    Input,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage
} from '../ui';

const Header = () => {

    return (
        <header className="flex min-h-[60px] items-center gap-4 border-b bg-[#000000] px-6">
            <Link href="#" className="text-[#fff]" prefetch={false}>
                <Package2Icon className="h-6 w-6" />
                <span className="sr-only">Home</span>
            </Link>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                        />
                    </div>
                </form>
            </div>
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
