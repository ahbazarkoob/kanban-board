"use client";

import { Task } from "@/types/task";
import React from "react";
import TaskCard from "./task_card";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

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
        <div ref={setNodeRef} className="bg-gray-100 rounded-lg p-4 h-[calc(100vh-200px)] flex flex-1 flex-col gap-4">
            <h2 className="font-semibold">{title}</h2>
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
