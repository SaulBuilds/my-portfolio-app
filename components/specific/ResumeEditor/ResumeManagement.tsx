//employable-dev-ep1.0/components/specific/ResumeEditor/ResumeManagement.tsx

import React, { useState, useEffect } from 'react';
import { ResumeEditor } from './ResumeEditor'; // Adjust the import path as necessary
import EducationModal from './Education'; // Adjust the import path as necessary
import ResumeList from './ResumeList'; // Import the ResumeListModal component
import { Resume } from '../../../types';
const ResumeManagement = () => {
    const [resumeId, setResumeId] = useState(0);
    const [isResumeEditorOpen, setIsResumeEditorOpen] = useState(false);
    const [resumes, setResumes] = useState([]); // State to hold the list of resumes
    const isAdmin = true; // Temporary, replace with actual admin check

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/getResume'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch resume');
                }
                const data = await response.json();
                setResumes(data);
            } catch (error) {
                console.error('Error fetching resumes:', error);
            }
        };
    
        fetchResumes();
    }, []);
    const handleResumeSaved = (id: number) => {
        setResumeId(id);
        setIsResumeEditorOpen(false);
        // Optionally fetch updated list of resumes
    };

    const handleOpenResumeEditor = (id: number) => {
        setResumeId(id);
        setIsResumeEditorOpen(true);
    };

    const handleCloseResumeEditor = () => {
        setIsResumeEditorOpen(false);
        // Optionally fetch updated list of resumes
    };

    const renderActiveComponent = () => {
        if (isResumeEditorOpen) {
            return (
                <ResumeEditor
                open={true}
                onClose={() => {}}
                onSaved={(id: number) => {}}
                onSave={(updatedResume: Resume) => {}}
                resumeData={{
                            id: undefined,
                            title: '',
                            description: '',
                            contact: {
                                email: '',
                                phone: '',
                                address: undefined,
                                linkedIn: undefined,
                                website: undefined
                            },
                            education: [],
                            workExperience: [],
                            skills: [],
                            certifications: undefined,
                            languages: undefined,
                            references: undefined
                        }}
                />
            );
        } else {
            return (
                <EducationModal 
                    open={resumeId > 0} 
                    onClose={() => setResumeId(0)} 
                    resumeId={resumeId} 
                />
            );
        }
    };

    return (
        <div>
            <ResumeList
                resumes={resumes}
                isAdmin={isAdmin}
                onEdit={handleOpenResumeEditor}
                // onView={handleViewResume} // Implement this function if needed
            />
            {renderActiveComponent()}
        </div>
    );
};

export default ResumeManagement;