import { createClient } from 'redis';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        // Process a DELETE request
        const client = createClient({
            url: 'redis://default:rOAbn9HDWGcyIkk5hVD1U5bG20DlgzRH@redis-17911.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17911',
        });

        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        console.log(req.query);

        await client.DEL(`student:${req.query.id}`);

        res.status(204).end();

        client.quit();
    } else {
        res.status(501).json({ message: 'Delete fail' });
    }
}
