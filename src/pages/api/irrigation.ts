import type {NextApiRequest, NextApiResponse} from 'next';
var mqtt = require('mqtt');


export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
    let requestMethod: string = req.method || "";
    if (requestMethod !== "GET") {
        return res.status(500).json({
            error: `Invalid request type! Expected 'GET', got '${requestMethod.toUpperCase()}'.`
        })
    }
    
    let client;
    const options = {
        host: process.env.NEXTJS_HOST,
        port: process.env.NEXTJS_PORT,
        protocol: process.env.NEXTJS_PROTOCOL,
        username: process.env.NEXTJS_USERNAME,
        password: process.env.NEXTJS_PASSWORD
    }

    const {status}: any = req.query;
    
    try {
        client = mqtt.connect(options);

        client.publish('irrigation', status);
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            sucess: false,
            data: {},
        })
    }
  
    // setup the callbacks
    client.on('connect', function () {
        console.log('Connected');
    });
  
    client.on('error', function (error: any) {
        console.log(error);
    });
  
    client.on('message', function (topic: any, message: { toString: () => any; }) {
        // called each time a message is received
        console.log('Received message:', topic, message.toString());
    });

    return res.status(200).json({
        sucess: true,
        data: status,
    })
}
