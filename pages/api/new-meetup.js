import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler (req, res) {
    if(req.method === "POST") {
        const data = req.body;
        
        const client = await  MongoClient.connect("mongodb+srv://gaby:14101997Pescar@cluster0.sqq1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        const db = client.db();
        
        const meetupsCollection = db.collection('meetups');
        
        const result = await meetupsCollection.insertOne(data);
        
        console.log(result);

        client.close()

        res.status(201).json({message:"Meetup inserted"})
    }
}

export default handler;