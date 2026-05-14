export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // උඹට ඕන Username Password මෙතන දාපන්
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'admin123';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ message: 'Login OK' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}
