import { MongoClient } from "mongodb";

export const create2DsphereIndex = async () => {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    try {
        const db = client.db('realEstate');
        const collection = db.collection('Property')
        await collection.createIndex({location:'2Dsphere'})
    } finally {
        await client.close();
    }
}