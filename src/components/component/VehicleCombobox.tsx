"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export function VehicleCombobox({
    vehicles,
    selectedId,
    handleSelect
}: {
    vehicles: Record<string, any>[];
    selectedId?: string;
    handleSelect: (id: string) => void;
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(selectedId);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {
                        value ? vehicles.find((vehicle) => vehicle.id === value)?.licensePlate : "Select vehicle..."
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search vehicle" onChangeCapture={() => console.log(value)} />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList className="max-h-[300px]">
                            {
                                vehicles.map((vehicle) => (
                                    <CommandItem
                                        key={vehicle.id}
                                        value={vehicle.id}
                                        keywords={[
                                            vehicle?.licensePlate,
                                            vehicle?.licensePlate.toLowerCase(),
                                            vehicle?.make,
                                            vehicle?.make?.toLowerCase(),
                                            vehicle?.model,
                                            vehicle?.model?.toLowerCase()
                                        ]}
                                        onSelect={(currentValue) => {
                                            console.log('Onselect:CurrentValue:', currentValue);
                                            setValue(currentValue === value ? "" : currentValue);
                                            handleSelect(currentValue);
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === vehicle.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <div className="grid">
                                            <span>{vehicle.licensePlate}</span>
                                            <div className="flex">
                                                <span>{vehicle.make}</span> -
                                                <span>{vehicle.model}</span>
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))
                            }
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
