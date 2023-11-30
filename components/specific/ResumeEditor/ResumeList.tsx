//components/specific/ResumeEditor/ResumeList.tsx

import React from 'react';
import { useRouter } from 'next/router';

type ResumeType = {
    id: number;
    title: string;
};

type ResumeListProps = {
    resumes: ResumeType[];
    isAdmin: boolean;
    onEdit: (id: number) => void;  // Add this if you need onEdit in ResumeList

};

const ResumeList: React.FC<ResumeListProps> = ({ resumes, isAdmin, onEdit }) => {
    const router = useRouter();

    // Function to handle view action
    const handleView = (resumeId: number) => {
        // Assuming '/resume/view/[id]' is the route for viewing a resume
        router.push(`/resume/view/${resumeId}`);
    };

    // Function to handle edit action
    const handleEdit = (resumeId: number) => {
        // Assuming '/resume/edit/[id]' is the route for editing a resume
        router.push(`/resume/edit/${resumeId}`);
    };

    const handleEditClick = (id: number) => {
        if (onEdit) {
            onEdit(id);
        }
    };

    return (
        <div>
            {resumes.map((resume) => (
                <div key={resume.id}>
                    <p>{resume.title} (ID: {resume.id})</p>
                    {isAdmin && (
                        <div>
                            <button onClick={() => handleView(resume.id)}>View</button>
                            <button onClick={() => handleEditClick(resume.id)}>Edit</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ResumeList;