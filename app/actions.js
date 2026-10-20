"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";

function clean(formData) {
  return {
    title: String(formData.get("title") || "").trim().slice(0, 150),
    content: String(formData.get("content") || "").trim(),
  };
}

export async function createNote(formData) {
  const { title, content } = clean(formData);
  if (!title) return;
  await query("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content]);
  revalidatePath("/");
}

export async function updateNote(formData) {
  const id = Number(formData.get("id"));
  const { title, content } = clean(formData);
  if (!id || !title) return;
  await query("UPDATE notes SET title = ?, content = ? WHERE id = ?", [title, content, id]);
  revalidatePath("/");
  redirect("/");
}

export async function deleteNote(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await query("DELETE FROM notes WHERE id = ?", [id]);
  revalidatePath("/");
}
