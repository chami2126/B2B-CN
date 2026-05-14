import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS Headers - මේක නැති නිසා තමයි Loading... stuck වෙන්නේ
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Browser preflight request එකට reply
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - ඔක්කොම messages ගන්න
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM messages ORDER BY id DESC;`;
      return res.status(200).json(rows);
    }

    // POST - අලුත් message එකක් save කරන්න
    if (req.method === 'POST') {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, message required" });
      }

      await sql`INSERT INTO messages (name, email, message) VALUES (${name}, ${email}, ${message});`;
      return res.status(200).json({ success: true, message: "Saved" });
    }

    // DELETE - message එකක් delete කරන්න
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await sql`DELETE FROM messages WHERE id = ${id};`;
      return res.status(200).json({ success: true, message: "Deleted" });
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (error) {
    console.error('DB Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
