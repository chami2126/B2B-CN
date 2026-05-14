import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db('cnpanel');
  const dealers = await db.collection('dealers').countDocuments();
  const sales = await db.collection('transactions').aggregate([
    {$group: {_id: null, total: {$sum: "$amount"}}}
  ]).toArray();
  res.json({
    total_dealers: dealers,
    total_sales: sales[0]?.total || 0
  });
}
