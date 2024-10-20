import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface FilterDropdownProps {
  title: string;
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
  onApply: () => void;
  visible?: boolean;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  options,
  selected,
  onSelect,
  onRemove,
  onApply,
  visible = true
}) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{title}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-sm">
            Select {title.toLowerCase()} <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Command>
            <CommandInput placeholder={`Search ${title.toLowerCase()}...`} className="text-sm" />
            <CommandList>
              <CommandEmpty className="text-sm">No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => onSelect(option)}
                    className="flex items-center space-x-2 px-2 py-1.5 cursor-pointer"
                  >
                    <div
                      className="flex items-center space-x-2 w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelect(option);
                      }}
                    >
                      <Checkbox
                        checked={selected.includes(option)}
                        id={`checkbox-${option}`}
                      />
                      <label
                        htmlFor={`checkbox-${option}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow"
                      >
                        {option}
                      </label>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="p-2">
            <Button onClick={onApply} className="w-full">Apply</Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-wrap gap-2 mt-2 pb-2">
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
    </div>
  );
};
