//employable-dev-ep1.0/components/specific/ResumeViewer.tsx

import React, { useEffect, useState } from 'react';
import { Resume } from '../../types';
import Link from 'next/link';
import { Card, CardContent, Typography, Box, Grid, Button } from '@mui/material';

interface ResumeViewerProps {
    resumeId?: string;
    isAuthenticated: boolean; // Add a prop to check if the user is authenticated
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ resumeId, isAuthenticated }) => {
    const [resume, setResume] = useState<Resume | null>(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`/api/getResume?resumeId=${resumeId}`);
                const data = await response.json();
                setResume(data[0]);
            } catch (error) {
                console.error('Error fetching resume:', error);
            }
        };

        if (resumeId) {
            fetchResume();
        }
    }, [resumeId]);

    if (!resume) {
        return <div>Loading...</div>;
    }

    const handleAuth = (provider: 'linkedin' | 'github') => {
        // Redirect to the authentication route for the provider
        window.location.href = `/api/auth/${provider}`;
    };

    return (
        <Box sx={{ m: 2 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" component="div">
                        {resume.title}
                    </Typography>
                    <Typography variant="body1" 
                    sx={{ mb: 2, ml: 4, whiteSpace: 'pre-line'}}>
                        {resume.description}
                    </Typography>
                    {isAuthenticated ? (
                        // Show contact information if authenticated
                        <>
                            <Typography variant="h6">Contact Information</Typography>
                            <Typography variant="body2">{resume.contact.address}</Typography>
                            <Typography variant="body2">{resume.contact.phone}</Typography>
                            <Link href={resume.contact.linkedIn || '#'}>LinkedIn</Link>
                        </>
                    ) : (
                        // Show authentication buttons if not authenticated
                        <Box>
                            <Button onClick={() => handleAuth('linkedin')}>Login with LinkedIn</Button>
                            <Button onClick={() => handleAuth('github')}>Login with GitHub</Button>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Education Section */}
            <Typography variant="h5" sx={{ mt: 2 }}>Education</Typography>
            {resume.education.map((edu, index) => (
                <Card variant="outlined" key={index} sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="h6">{edu.institution}</Typography>
                        <Typography variant="body2">{edu.degree}, {edu.fieldOfStudy}</Typography>
                        <Typography variant="body2">{edu.startDate} - {edu.endDate}</Typography>
                        <Typography variant="body2">{edu.description}</Typography>
                    </CardContent>
                </Card>
            ))}

            {/* Work Experience Section */}
            <Typography variant="h5" sx={{ mt: 2 }}>Work Experience</Typography>
            {resume.workExperience.map((work, index) => (
                <Card variant="outlined" key={index} sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="h6">{work.company}</Typography>
                        <Typography variant="body2">{work.position}</Typography>
                        <Typography variant="body2">{work.startDate} - {work.endDate}</Typography>
                        <Typography variant="body2">{work.description}</Typography>
                    </CardContent>
                </Card>
            ))}

            {/* Additional sections for Skills, Certifications, Languages, References can be added similarly */}
        </Box>
    );
};

export default ResumeViewer;
