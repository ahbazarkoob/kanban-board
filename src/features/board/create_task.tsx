"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/store/taskStore";
import React, { useState } from "react";

const CreateTask = () => {
  const { addTask } = useTaskStore();

  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    if (!title) return;

    await addTask({
      title,
      status: "todo",
      priority: "medium",
    });

    setTitle("");
  };

  return (
    <div className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        className="border p-2 rounded w-64"
      />

      <Button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </Button>
    </div>
  );
};

export default CreateTask;
