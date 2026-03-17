import { create } from "zustand";
import { Task } from "@/types/task";
import { supabase } from "@/lib/supabase";

type TaskStore = {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    set({ tasks: data });
  },

  addTask: async (task) => {
    const { error } = await supabase.from("tasks").insert(task);

    if (error) {
      console.error(error);
      return;
    }
    const { data } = await supabase.from("tasks").select("*");
    set({ tasks: data || [] });
  },

  updateTask: async (id, updates) => {
    const { error } = await supabase.from("tasks").update(updates).eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    const { data } = await supabase.from("tasks").select("*");
    set({ tasks: data || [] });
  },

  deleteTask: async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    const { data } = await supabase.from("tasks").select("*");
    set({ tasks: data || [] });
  },
}));
