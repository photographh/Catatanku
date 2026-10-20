import { query } from "@/lib/db";
import { createNote, deleteNote } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  let notes = [];
  let error = null;

  try {
    notes = await query("SELECT id, title, content, created_at FROM notes ORDER BY id DESC");
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <h1>Catatan</h1>
      <p className="sub">Create, read, update, delete. Cuma itu.</p>

      <form action={createNote} className="card form">
        <input name="title" placeholder="Judul catatan" maxLength={150} required />
        <textarea name="content" placeholder="Isi catatan" rows={3} />
        <button type="submit">Simpan catatan</button>
      </form>

      {error && (
        <div className="error">
          Gagal konek ke database: {error}. Cek environment variable DB_* lu.
        </div>
      )}

      {!error && notes.length === 0 && (
        <p className="empty">Belum ada catatan. Tulis satu di atas.</p>
      )}

      <ul className="list">
        {notes.map((n) => (
          <li key={n.id} className="card">
            <div>
              <h2>{n.title}</h2>
              {n.content && <p>{n.content}</p>}
              <small>{new Date(n.created_at).toLocaleString("id-ID")}</small>
            </div>
            <div className="actions">
              <Link href={`/edit/${n.id}`} className="btn ghost">
                Edit
              </Link>
              <form action={deleteNote}>
                <input type="hidden" name="id" value={n.id} />
                <button type="submit" className="danger">
                  Hapus
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
