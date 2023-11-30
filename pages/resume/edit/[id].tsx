// pages/resume/edit/[id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ResumeEditor } from '../../../components/specific/ResumeEditor/ResumeEditor';
import { Resume } from '../../../types';



const EditResumePage = () => {
    const router = useRouter();
    const { resumeId } = router.query;
    const [resumeData, setResumeData] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(true); // Assuming you want to open it by default

    useEffect(() => {
        if (resumeId) {
            fetch(`/api/${resumeId}`)
                .then((response) => response.json())
                .then((data) => setResumeData(data))
                .catch((error) => console.error('Error fetching resume:', error));
        }
    }, [resumeId]);

    const handleSave = (updatedResume: Resume) => {
        // Implementation for saving the resume
    };

    const handleClose = () => {
        setIsEditorOpen(false);
        // Additional logic for closing the editor (like navigating back)
    };

    if (!resumeData) {
        return <div>Loading...</div>;
    }

    return (
        <ResumeEditor
            open={isEditorOpen}
            onClose={handleClose}
            resumeData={resumeData}
            onSave={handleSave}
        />
    );
};

export default EditResumePage;