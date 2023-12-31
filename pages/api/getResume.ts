import { sql } from "@vercel/postgres"; 
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const resumeId = typeof req.query.resumeId === 'string' ? req.query.resumeId : undefined;

    try {
        let resumes;
        if (resumeId) {
            // fetch a specific Resume
            const resumeResult = await sql `SELECT * FROM resumes WHERE id = ${resumeId}`;
            resumes = resumeResult.rows;
        }else {
            // fetch all Resumes
            const resumeResult = await sql `SELECT * FROM resumes`;
            resumes =resumeResult.rows;
        }
        // Fetch subsections for each resume
        for (const resume of resumes) {
            const educationResult = await sql`SELECT * FROM education WHERE resume_id = ${resume.id}`;
            resume.education = educationResult.rows;

            const workExperienceResult = await sql`SELECT + * FROM certification where resume_id = ${resume.id}`;
            resume.workExperience = workExperienceResult.rows;

            const certificationsResult = await sql`SELECT * FROM certifications WHERE resume_id = ${resume.id}`;
            resume.certifications = certificationsResult.rows;

            const languagesResult = await sql`SELECT * FROM languages WHERE resume_id = ${resume.id}`;
            resume.languages = languagesResult.rows;
        }

        res.status(200).json(resumes);
        } catch (error) {
            console.log("Error in getResumes", error);
            res.status(500).send({ message: "An error occurred while trying to retrieve the resumes." });
    }
}