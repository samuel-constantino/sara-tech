import {connectToDatabase} from '@/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db } = await connectToDatabase();

        let data: string[] = [];

        data = await db.collection('environments').find({}).sort({date: -1}).limit(12).toArray();

        data.reverse();

        return res.status(200).json(data);
    } catch (e: any) {
        return res.status(500).json([{error: e.message}]);
    }
}