import {connectToDatabase} from '@/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db } = await connectToDatabase();

        let data: string[] = [];

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        data = await db.collection('environments').aggregate([{
            $match: {
                date: { $eq: formattedDate },
            }
        }]).toArray();

        return res.status(200).json(data);
    } catch (e: any) {
        return res.status(500).json([{error: e.message}]);
    }
}