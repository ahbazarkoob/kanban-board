"use client"

import { useEffect } from "react"
import { useTaskStore } from "@/store/taskStore"
import Board from "@/features/board/board"
import CreateTask from "@/features/board/create_task"

export default function Home() {
  const { tasks, fetchTasks } = useTaskStore()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-row justify-between items-center p-6">
        <div className="text-3xl font-semibold">Kanban Board Dashboard</div>
        <CreateTask />
      </div>
      <Board />
    </main>
  )
}