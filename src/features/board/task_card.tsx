"use client";

import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-4 rounded shadow cursor-grab flex flex-col gap-2"
    >
      <div className="flex justify-end">
        <div
          className={cn(
            "text-xs text-gray-400 capitalize border rounded-full px-2 py-1",
            task.priority === "low" ?
              "bg-green-400 border-green-500 text-green-500" :
              task.priority === "medium" ?
                "bg-orange-200 border-orange-500 text-orange-500" :
                "bg-red-300 border-red-700 text-red-700"
          )}
        >
          {task.priority}
        </div>
      </div>
      <h3 className="font-medium ">{task.title}</h3>

      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;
