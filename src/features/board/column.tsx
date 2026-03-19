"use client";

import { Task } from "@/types/task";
import React from "react";
import TaskCard from "./task_card";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

type ColumnProps = {
    columnId: string;
    title: string;
    tasks: Task[];
};

const Column = ({ columnId, title, tasks }: ColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: columnId,
    });
    return (
        <div
            ref={setNodeRef}
            className="bg-gray-100 rounded-xl p-4 h-fit flex flex-1 flex-col gap-4"
        >
            <h2
                className={cn(
                    "font-semibold py-2 px-4 rounded-xl",
                    title === "Todo"
                        ? "bg-violet-500"
                        : title === "In Progress"
                            ? "bg-blue-500"
                            : title === "Review"
                                ? "bg-amber-500"
                                : title === "Done"
                                    ? "bg-green-500"
                                    : ""
                )}
            >
                {title}
            </h2>
            <SortableContext
                items={tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default Column;
