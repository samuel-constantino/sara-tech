import {connectToDatabase} from '@/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db } = await connectToDatabase();

        let data: string[] = [];

        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        let day = ('0' + currentDate.getDate()).slice(-2);
        let formatedDate = year + '-' + month + '-' + day;

        data = await db.collection('environments').aggregate([{
            $match: {
                date: { $eq: formatedDate },
            }
        }]).toArray();

        return res.status(200).json(data);
    } catch (e: any) {
        return res.status(500).json([{error: e.message}]);
    }
}