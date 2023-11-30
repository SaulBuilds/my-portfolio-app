import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Resume } from '../../../types';

interface ViewResumeModalProps {
  resumeId: string;
  open: boolean;
  onClose: () => void;
}

const ViewResumeModal: React.FC<ViewResumeModalProps> = ({ resumeId, open, onClose }) => {
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  useEffect(() => {
    if (resumeId) {
      // Fetch the resume data
      fetch(`/api/${resumeId}`)
        .then((response) => response.json())
        .then((data) => setResumeData(data))
        .catch((error) => console.error('Error fetching resume:', error));
    }
  }, [resumeId]);

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box> {/* Style this box as needed */}
        <Typography variant="h4">{resumeData.title}</Typography>
        <Typography variant="h4">{resumeData.description}</Typography>

      </Box>
    </Modal>
  );
};

export default ViewResumeModal;