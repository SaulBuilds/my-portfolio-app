//components/specific/ResumeEditor/Education.tsx

import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

type EducationModalProps = {
    open: boolean;
    onClose: () => void;
    resumeId: number; 
};

// The EducationModal component for managing education entries
const EducationModal: React.FC<EducationModalProps> = ({ open, onClose, resumeId }) => {
    // Initialize state for all fields in the Education type
    const [education, setEducation] = useState({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    // Handle changes to form inputs
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEducation({ ...education, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Perform POST request to save education data
            const response = await fetch(`/api/resume/${resumeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(education),
            });

            if (response.ok) {
                console.log('Education saved successfully');
                onClose(); // Close modal upon successful submission
            } else {
                console.error('Error saving education');
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="education-modal"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Education
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Form fields for each property in the Education type */}
                    <TextField
                        label="Institution"
                        variant="outlined"
                        name="institution"
                        value={education.institution}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    {/* Add additional fields for degree, fieldOfStudy, startDate, endDate, description */}
                    <TextField
                        label="Degree"
                        variant="outlined"
                        name="degree"
                        value={education.degree}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Field of Study"
                        variant="outlined"
                        name="fieldOfStudy"
                        value={education.fieldOfStudy}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Start Date"
                        variant="outlined"
                        name="startDate"
                        value={education.startDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="date"  // Assuming date input, adjust format as needed
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="End Date"
                        variant="outlined"
                        name="endDate"
                        value={education.endDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="date"  // Assuming date input, adjust format as needed
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={education.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />

                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Save Education
                    </Button>

                </form>
            </Box>
        </Modal>
    );
};

export default EducationModal;