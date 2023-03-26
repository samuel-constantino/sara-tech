import type {NextApiRequest, NextApiResponse} from 'next';
var mqtt = require('mqtt');


export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
    let requestMethod: string = req.method || "";
    if (requestMethod !== "GET") {
        return res.status(500).json({
            error: `Invalid request type! Expected 'GET', got '${requestMethod.toUpperCase()}'.`
        })
    }

    const host = process.env.NEXTJS_HOST;
    const port = process.env.NEXTJS_PORT;
    const protocol = process.env.NEXTJS_PROTOCOL;
    const username = process.env.NEXTJS_USERNAME;
    const password = process.env.NEXTJS_PASSWORD;

    const options = {
        host,
        port,
        protocol,
        username,
        password,
    }

    const {status}: any = req.query;

    let sub = false;
    let pub = false;
    
    try {
        const client = mqtt.connect(options);
        
        client.on('connect', function () {
            console.log('Connected');
            // Subscribe to a topic
            client.subscribe('irrigation', () => {
                console.log('Subscribed');
                sub = true;
                
                client.publish('irrigation', status);
                console.log('Published');
                pub = true;

                return res.status(200).json({
                    sucess: true,
                    data: {topic: 'irrigation', message: status, infos: {sub, pub}},
                })
            })
        })
        
    } catch(err: any) {
        console.log(err);
        return res.status(500).json({
            sucess: false,
            data: {err},
        })
    }
}
