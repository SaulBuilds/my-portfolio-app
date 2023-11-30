// pages/api/github.ts
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        // You can use the `req` object to access user information obtained from GitHub
        // For example, req.body may contain GitHub user data after authentication

        // Extract GitHub user data from the request body
        const { login, email } = req.body;

        // Start a transaction
        await sql`BEGIN`;

        // Insert the GitHub user data into your database
        const insertUserDataQuery = sql`
            INSERT INTO githubusers (login, email)
            VALUES (${login}, ${email})
            RETURNING id
        `;

        const result = await insertUserDataQuery;
        const userId = result.rows[0].id;

        // Commit the transaction
        await sql`COMMIT`;

        res.status(200).json({ message: 'GitHub user data saved successfully', userId });
    } catch (error) {
        // Rollback in case of error
        await sql`ROLLBACK`;
        console.error('Error saving GitHub user data', error);
        res.status(500).json({ error: 'Error saving GitHub user data' });
    }
}
