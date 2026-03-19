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
      className="bg-white p-4 border-gray-300 rounded-xl shadow cursor-grab flex flex-col gap-2"
    >
      <div className="flex justify-between">
        <h3 className="font-medium ">{task.title}</h3>
        <div
          className={cn(
            "text-xs text-gray-400 capitalize border rounded-full px-2 py-1",
            task.priority === "low" ?
              "bg-green-100 border-green-600 text-green-600" :
              task.priority === "medium" ?
                "bg-yellow-100 border-yellow-600 text-yellow-600" :
                "bg-red-100 border-red-600 text-red-600"
          )}
        >
          {task.priority}
        </div>
      </div>


      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;
