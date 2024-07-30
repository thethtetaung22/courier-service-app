import React from 'react';
import TableSearchInput from './TableSearchInput';

const TableTemplate = ({
    title,
    actionButtons,
    children,
}: Readonly<{
    title: string;
    actionButtons: React.ReactNode;
    children: React.ReactNode;
}>) => {

    return (
        <div className="flex h-full w-full flex-col gap-4 overflow-x-hidden">
            <div className="flex justify-between items-center py-4">
                <h1 className="font-semibold text-lg md:text-2xl">{title || 'Table'}</h1>
                <div className="flex gap-4 items-center">
                    <TableSearchInput />
                    {actionButtons}
                </div>
            </div>
            {children}
        </div>
    )
}

export default TableTemplate