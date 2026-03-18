"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    onSearch: (value: string) => void;
    onSort: (value: string) => void;
};

export default function TaskToolbar({ onSearch, onSort }: Props) {
    const [search, setSearch] = useState("");

    return (
        <div className="flex gap-4 items-center">
            <Input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    onSearch(e.target.value);
                }}
                className="w-64"
            />
            <Select onValueChange={(e) => onSort(e)}>
                <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="created">Created</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}