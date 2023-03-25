import type {NextApiRequest, NextApiResponse} from 'next';
var mqtt = require('mqtt');


export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
    let requestMethod: string = req.method || "";
    
    // Prevents the endpoint from receiving other request types than "get"
    if (requestMethod !== "GET") {
        return res.status(500).json({
            error: `Invalid request type! Expected 'GET', got '${requestMethod.toUpperCase()}'.`
        })
    }
    
    const {status}: any = req.query;

    const port = process.env.NEXTJS_PORT;

    const options = {
        host: process.env.NEXTJS_HOST,
        port: process.env.NEXTJS_PORT,
        protocol: process.env.NEXTJS_PROTOCOL,
        username: process.env.NEXTJS_USERNAME,
        password: process.env.NEXTJS_PASSWORD
    }
  
    // initialize the MQTT client
    let client;
    try {
        client = mqtt.connect(options);
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
  
    // subscribe to topic 'my/test/topic'
    client.subscribe('irrigation');
  
    // publish message 'Hello' to topic 'irrigation'
    client.publish('irrigation', status);

    return res.status(200).json({
        sucess: true,
        data: status,
    })
}
