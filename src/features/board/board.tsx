"use client";

import { useTaskStore } from "@/store/taskStore";
import React, { useEffect } from "react";
import Column from "./column";
import { DndContext } from "@dnd-kit/core";

const columns = [
    { id: "todo", title: "Todo" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
];

const Board = () => {
    const { tasks, fetchTasks, updateTask } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;

        const newStatus = over.id;

        const task = tasks.find((t) => t.id === taskId);

        if (!task) return;

        if (task.status === newStatus) return;

        await updateTask(taskId, { status: newStatus });
    };
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-4 gap-6 p-6 h-full flex-1">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        columnId={column.id}
                        title={column.title}
                        tasks={tasks.filter((task) => task.status === column.id)}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default Board;
