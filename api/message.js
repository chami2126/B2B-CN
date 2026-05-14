import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM messages ORDER BY id DESC;`;
    return res.status(200).json(rows);
  }
  
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    await sql`INSERT INTO messages (name, email, message) VALUES (${name}, ${email}, ${message});`;
    return res.status(200).json({ message: "Saved" });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    await sql`DELETE FROM messages WHERE id = ${id};`;
    return res.status(200).json({ message: "Deleted" });
  }
}
