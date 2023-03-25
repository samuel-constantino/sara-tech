import type {NextApiRequest, NextApiResponse} from 'next';
var mqtt = require('mqtt');


export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
    let requestMethod: string = req.method || "";
    if (requestMethod !== "GET") {
        return res.status(500).json({
            error: `Invalid request type! Expected 'GET', got '${requestMethod.toUpperCase()}'.`
        })
    }
    
    let client: { on: (arg0: string, arg1: { (): void; (topic: any, message: any): void; }) => void; subscribe: (arg0: string, arg1: (err: any) => void) => void; publish: (arg0: string, arg1: any) => void; end: () => void; };

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
    
    try {
        client = mqtt.connect(options);

        client.on('connect', function () {
            console.log('Connected');
            // Subscribe to a topic
            client.subscribe('irrigation', function (err) {
                console.log('Subscribe irrigation');
                
                if (err) {
                    return res.status(500).json({
                        sucess: false,
                        data: err,
                    });
                }
                
                client.publish('irrigation', status);
                console.log('Publish ', status);
            })
          })

          return res.status(200).json({
            sucess: true,
            data: {status, port, protocol},
          })
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            sucess: false,
            data: {},
        })
    }
}
