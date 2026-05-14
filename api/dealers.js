import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db('cnpanel');
  if(req.method === 'GET'){
    const dealers = await db.collection('dealers').find({}).toArray();
    return res.json(dealers);
  }
  if(req.method === 'POST'){
    const {username, password, balance} = req.body;
    await db.collection('dealers').insertOne({
      username, password, balance: parseFloat(balance) || 0,
      status: 'active', created_at: new Date()
    });
    return res.json({status: 'success', message: 'Dealer Added'});
  }
}
