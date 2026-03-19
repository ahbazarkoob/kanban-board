"use client";

import { Button } from "@/components/ui/button";
import Board from "@/features/board/board";
import CreateTaskDialog from "@/features/board/create-task-dialog";
import TaskToolbar from "@/features/board/task-toolbar";
import { useTaskStore } from "@/store/taskStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { tasks, fetchTasks } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("created");
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "priority") {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.priority] - order[a.priority];
      }

      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-row justify-between items-center p-6">
        <div className="text-3xl font-semibold">Kanban Board Dashboard</div>
        <div className="flex flex-row items-center gap-3">
          <TaskToolbar onSearchAction={setSearchQuery} onSortAction={setSortType} />
          <Button size={"icon-lg"} className="rounded-full" variant={"outline"} onClick={() => setIsCreateTaskDialogOpen(true)}>
            <Plus />
          </Button>
          <CreateTaskDialog
            open={isCreateTaskDialogOpen}
            setOpen={setIsCreateTaskDialogOpen}
          />
        </div>
      </div>
      <Board filteredTasks={filteredTasks} />
    </main>
  );
}
