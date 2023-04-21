import {connectToDatabase} from '@/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { datetime } from '@/services'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db } = await connectToDatabase();

        let data: string[] = [];

        const { date } = datetime();

        data = await db.collection('environments').aggregate([{
            $match: {
                date: { $eq: date },
            }
        }]).toArray();

        return res.status(200).json(data);
    } catch (e: any) {
        return res.status(500).json([{error: e.message}]);
    }
}