import {connectToDatabase} from '@/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db } = await connectToDatabase();

        const data = await db.collection('actions').find().sort({_id: -1}).limit(1).toArray();

        return res.status(200).json(data[0]);
    } catch (e: any) {
        return res.status(500).json([{error: e.message}]);
    }
}