export type Resume = {
    id?: number; 
    title: string;
    description: string; 
    contact: {
        email: string;
        phone: string;
        address?: string;
        linkedIn?: string;
        website?: string;
    };
    education: Education[];
    workExperience: WorkExperience[];
    skills: string[];
    certifications?: Certification[];
    languages?: Language[];
    references?: Reference[];
};

export type Education = {
    institution: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string; // Format: YYYY-MM or YYYY
    endDate?: string; // Format: YYYY-MM or YYYY or 'Present'
    description?: string; // Additional details, achievements, etc.
};

export type WorkExperience = {
    company: string;
    position: string;
    startDate: string; // Format: YYYY-MM or YYYY
    endDate?: string; // Format: YYYY-MM or YYYY or 'Present'
    description?: string; // Responsibilities and achievements
};

export type Certification = {
    name: string;
    issuedBy: string; // Issuing organization
    issueDate?: string; // Format: YYYY-MM or YYYY
    expiryDate?: string; // Format: YYYY-MM or YYYY
};

export type Language = {
    name: string;
    proficiencyLevel?: string; // e.g., 'Native', 'Fluent', 'Professional', etc.
};

export type Reference = {
    name: string;
    position?: string; // Position of the reference
    company?: string;
    contactInfo?: string; // Email or phone number
};


export type ResumeData = (ResumeData:ResumeData) => {
    id?: number;
    title: string;
    description: string;
    // ... other fields as per your resume structure
}