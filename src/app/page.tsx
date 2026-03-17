"use client"

import { useEffect } from "react"
import { useTaskStore } from "@/store/taskStore"

export default function Home() {
  const { tasks, fetchTasks } = useTaskStore()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>

      {tasks.map((task) => (
        <div key={task.id} className="border p-4 mb-3 rounded">
          <h2 className="font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-500">{task.status}</p>
        </div>
      ))}
    </main>
  )
}