// pages/api/resume/[id].js

import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tokenId } = req.query;

    // Handle different request methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
            // Fetch data for a specific tokenId
            break;
        case 'PUT':
            // Update data for a specific tokenId
            break;
        // Add other methods as needed
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}