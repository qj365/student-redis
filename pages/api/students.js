import { createClient } from 'redis';

export default async function handler(req, res) {
    const client = createClient({
        url: 'redis://default:rOAbn9HDWGcyIkk5hVD1U5bG20DlgzRH@redis-17911.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:17911',
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    if (!Object.keys(req.query).length) {
        const allKey = await client.keys('*');

        const allStudents = allKey.map(async key => {
            const student = await client.hGetAll(key);
            return student;
        });
        res.status(200).json(await Promise.all(allStudents));
    } else {
        let query = ``;

        if (req.query.id) {
            query += `@id:${req.query.id}`;
        }
        if (req.query.name) {
            query += `@name:${req.query.name}`;
        }
        if (req.query.gender) {
            query += `@gender:${req.query.gender}`;
        }
        if (req.query.gpaFrom && req.query.gpaTo) {
            query += `@gpa:[${req.query.gpaFrom} ${req.query.gpaTo}]`;
        }
        if (req.query.gpaFrom && !req.query.gpaTo) {
            query += `@gpa:[${req.query.gpaFrom} +inf]`;
        }
        if (!req.query.gpaFrom && req.query.gpaTo) {
            query += `@gpa:[-inf ${req.query.gpaTo}]`;
        }

        const filterStudents = await client.ft.search('student-idx', query);
        res.status(200).json(filterStudents.documents.map(doc => doc.value));
    }

    client.quit();
}
