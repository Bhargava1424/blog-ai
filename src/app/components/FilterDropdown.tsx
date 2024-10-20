import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface FilterDropdownProps {
  title: string
  options: string[]
  selected: string[]
  onSelect: (value: string) => void
  onRemove: (value: string) => void
  onApply: () => void
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  title, 
  options, 
  selected, 
  onSelect, 
  onRemove, 
  onApply
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between text-sm">
            {title}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <Command>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput placeholder={`Search ${title.toLowerCase()}...`} className="flex-1" />
            </div>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => onSelect(option)}
                    className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.includes(option)}
                      onCheckedChange={() => onSelect(option)}
                    />
                    <Label className="flex-grow">{option}</Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="p-2">
            <Button onClick={() => { onApply(); setOpen(false); }} className="w-full">
              Apply
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((item) => (
            <Badge key={item} variant="secondary" className="text-xs">
              {item}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0"
                onClick={() => onRemove(item)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
