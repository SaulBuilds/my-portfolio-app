// pages/api/resume.ts
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resume } from '../../types';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      try {
        const resumeData: Resume = req.body;
  
        // Start a transaction
        await sql`BEGIN`;
  
        // Insert main resume data
        const insertResumeQuery = sql`
        INSERT INTO resumes (title, description, contact, skills)
        VALUES (${resumeData.title}, ${resumeData.description}, ${JSON.stringify(resumeData.contact)}, ${JSON.stringify(resumeData.skills)})
        RETURNING id
        `;
        const result = await insertResumeQuery;
        const resumeId = result.rows[0].id;
  
        // Insert subsections (e.g., education)
        for (const edu of resumeData.education) {
          await sql`
            INSERT INTO education (resume_id, institution, degree, fieldOfStudy, startDate, endDate, description)
            VALUES (${resumeId}, ${edu.institution}, ${edu.degree}, ${edu.fieldOfStudy}, ${edu.startDate}, ${edu.endDate}, ${edu.description})
          `;
        }
  
// Insert work experience
for (const work of resumeData.workExperience) {
    await sql`
      INSERT INTO work_experience (resume_id, company, position, startDate, endDate, description)
      VALUES (${resumeId}, ${work.company}, ${work.position}, ${work.startDate}, ${work.endDate}, ${work.description})
    `;
  }
  // Check if certifications are defined before inserting
if (resumeData.certifications) {
    for (const cert of resumeData.certifications) {
      await sql`
        INSERT INTO certifications (resume_id, name, issuedBy, issueDate, expiryDate)
        VALUES (${resumeId}, ${cert.name}, ${cert.issuedBy}, ${cert.issueDate}, ${cert.expiryDate})
      `;
    }
  }
  
    // Check if languages are defined before inserting
    if (resumeData.languages) {
        for (const lang of resumeData.languages) {
        await sql`
            INSERT INTO languages (resume_id, name, proficiencyLevel)
            VALUES (${resumeId}, ${lang.name}, ${lang.proficiencyLevel})
        `;
        }
    }
    
    // Check if references are defined before inserting
    if (resumeData.references) {
        for (const ref of resumeData.references) {
        await sql`
            INSERT INTO references (resume_id, name, position, company, contactInfo)
            VALUES (${resumeId}, ${ref.name}, ${ref.position}, ${ref.company}, ${ref.contactInfo})
        `;
        }
    }
    
        // Commit the transaction
        await sql`COMMIT`;
  
        res.status(200).json({ message: 'Resume saved successfully' });
      } catch (error) {
        // Rollback in case of error
        await sql`ROLLBACK`;
        console.error('Error saving resume', error);
        res.status(500).json({ error: 'Error saving resume' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }