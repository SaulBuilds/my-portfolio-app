import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { login, email } = req.body;

        await sql`BEGIN`;
        const insertUserDataQuery = sql`
            INSERT INTO githubusers (login, email)
            VALUES (${login}, ${email})
            RETURNING id
        `;

        const result = await insertUserDataQuery;
        const userId = result.rows[0].id;

        await sql`COMMIT`;

        res.status(200).json({ message: 'GitHub user data saved successfully', userId });
    } catch (error) {
        //rollback in case of error
        await sql`ROLLBACK`;
        console.error('Error saving GitHub user data', error);
        res.status(500).json({ error: 'Error saving GitHub user data' });
    }
}