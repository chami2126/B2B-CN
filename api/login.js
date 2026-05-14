import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({error: 'Method not allowed'});
  try {
    await client.connect();
    const db = client.db('cnpanel');
    const {username, password} = req.body;
    const admin = await db.collection('admins').findOne({username, password});
    if(admin){
      return res.status(200).json({status: 'success', message: 'Login OK'});
    }
    return res.status(401).json({status: 'error', message: 'Invalid credentials'});
  } catch(e){
    return res.status(500).json({error: e.message});
  }
}
