import { createClient } from 'redis';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const client = createClient({
            url: 'redis://default:rOAbn9HDWGcyIkk5hVD1U5bG20DlgzRH@redis-17911.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17911',
        });

        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        const keyAll = await client.keys('*');

        const lastestId = keyAll
            .map(key => key.split(':')[1])
            .sort((a, b) => b - a)[0];

        let id;
        if (lastestId) {
            id = parseInt(lastestId) + 1;
        } else {
            id = 1;
        }

        await client.hSet(`student:${id}`, `id`, `${id}`);
        await client.hSet(`student:${id}`, `name`, `${req.body.name}`);
        await client.hSet(`student:${id}`, `gender`, `${req.body.gender}`);
        await client.hSet(
            `student:${id}`,
            `gpa`,
            `${parseFloat(req.body.gpa).toFixed(2)}`
        );

        res.status(200).json({ message: 'Success' });

        client.quit();
    } else if (req.method === 'PUT') {
        const client = createClient({
            url: 'redis://default:rOAbn9HDWGcyIkk5hVD1U5bG20DlgzRH@redis-17911.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17911',
        });

        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        const id = req.body.id;

        await client.hSet(`student:${id}`, `id`, `${id}`);
        await client.hSet(`student:${id}`, `name`, `${req.body.name}`);
        await client.hSet(`student:${id}`, `gender`, `${req.body.gender}`);
        await client.hSet(
            `student:${id}`,
            `gpa`,
            `${parseFloat(req.body.gpa).toFixed(2)}`
        );

        res.status(200).json({ message: 'Success' });

        client.quit();
    } else {
        res.status(501).json({ message: 'Wrong method' });
    }
}
