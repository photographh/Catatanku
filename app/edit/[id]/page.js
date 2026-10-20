import { notFound } from "next/navigation";
import Link from "next/link";
import { query } from "@/lib/db";
import { updateNote } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!id) notFound();

  const rows = await query("SELECT id, title, content FROM notes WHERE id = ?", [id]);
  const note = rows[0];
  if (!note) notFound();

  return (
    <>
      <h1>Edit catatan</h1>
      <form action={updateNote} className="card form">
        <input type="hidden" name="id" value={note.id} />
        <input name="title" defaultValue={note.title} maxLength={150} required />
        <textarea name="content" defaultValue={note.content || ""} rows={5} />
        <div className="row">
          <button type="submit">Simpan perubahan</button>
          <Link href="/" className="btn ghost">
            Batal
          </Link>
        </div>
      </form>
    </>
  );
}
