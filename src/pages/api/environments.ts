import {connectToDatabase} from '@/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db } = await connectToDatabase();

        const environments = await db.collection("environments");
        let data: string[] = [];

        if(environments) {
            const date = new Date();
            
            let month = ""+(date.getMonth() + 1);
            month = +month < 10 ? "0"+month : ""+month;

            // let day = ""+date.getDate();
            // day = +day < 10 ? "0"+day : ""+day;

            // const currentDate = date.getFullYear()+"-"+month+"-"+day;
            const currentDate = `${date.getFullYear()}-${month}-14`;

            data = await db.collection('environments').find({
                date: {
                    $eq: currentDate,
                }
            }).toArray();
        }

        return res.status(200).json(data);
    } catch (e: any) {
        return res.status(500).json([{error: e.message}]);
    }
}