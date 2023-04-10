import {connectToDatabase} from '@/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db, client } = await connectToDatabase();

        const environments = await db.collection("environments");
        let data = [];

        if(environments) {
            data = await db.collection('environments').find({}).limit(20).toArray();
        }

        return res.status(200).json(data);
    } catch (e) {
        console.error(e);
    }
}