"use client";

import { useTaskStore } from "@/store/taskStore";
import Column from "./column";
import { DndContext } from "@dnd-kit/core";
import TaskToolbar from "./task-toolbar";
import { Task } from "@/types/task";

const columns = [
    { id: "todo", title: "Todo" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
];

type BoardProps = {
    filteredTasks: Task[]
}

const Board = ({filteredTasks}: BoardProps) => {
    const { updateTask } = useTaskStore();

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;

        const newStatus = over.id;
        if (!columns.includes(newStatus)) return;

        const task = filteredTasks.find((t) => t.id === taskId);

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
                        tasks={filteredTasks.filter((task) => task.status === column.id)}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default Board;
