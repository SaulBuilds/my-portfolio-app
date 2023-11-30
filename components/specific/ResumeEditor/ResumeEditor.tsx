//components/specific/ResumeEditor/ResumeEditor.tsx

import React, { useState, FormEvent } from "react";
import { Modal, Box, TextField, Button, Typography, Grid } from "@mui/material";
import { Resume } from "../../../types";
import _ from "lodash";


type ResumeEditorProps = {
  existingResume?: Resume;
  open: boolean;
  onClose: () => void;
  onSaved?: (id: number) => void;
  onSubmit?: () => void;
  resumeData: Resume;
  onSave: (updatedResume: Resume) => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  existingResume,
  open,
  onClose,
  onSaved,
}) => {
  const [resumeData, setResumeData] = useState<Resume>(
    existingResume || {
      title: "",
      description: "",
      contact: { email: "", phone: "", address: "", linkedIn: "", website: "" },
      education: [],
      workExperience: [],
      skills: [],
      certifications: [],
      languages: [],
      references: [],
    }
  );
  const [activeView, setActiveView] = useState("resumeEditor");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setResumeData((currentData) => {
      // Create a deep clone of the current state
      const newData = _.cloneDeep(currentData);

      // Split the name by '.' to handle nested properties
      const nameParts = name.split(".");

      // Use Lodash's set function to safely update the nested property
      _.set(newData, nameParts, value);

      return newData;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });
      if (response.ok) {
        console.log("Resume saved successfully");
        if (onSaved) {
          onSaved(resumeData.id || 0);
        } // Assuming you get the ID from resumeData
      } else {
        console.error("Error saving resume");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="resume-editor-modal"
      aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Resume
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Title and Description */}
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={resumeData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={resumeData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />

            {/* Contact Information */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="contact.email"
                  value={resumeData.contact.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  name="contact.phone"
                  value={resumeData.contact.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  name="contact.address"
                  value={resumeData.contact.address}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="LinkedIn"
                  variant="outlined"
                  name="contact.linkedIn"
                  value={resumeData.contact.linkedIn}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Website"
                  variant="outlined"
                  name="contact.website"
                  value={resumeData.contact.website}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Education Section */}
            {resumeData.education.map((edu, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Institution"
                    variant="outlined"
                    name={`education[${index}].institution`}
                    value={edu.institution}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                {/* Additional fields for degree, fieldOfStudy, dates, description */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Degree"
                    variant="outlined"
                    name={`education[${index}].degree`}
                    value={edu.degree}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Field of Study"
                    variant="outlined"
                    name={`education[${index}].fieldOfStudy`}
                    value={edu.fieldOfStudy}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    variant="outlined"
                    name={`education[${index}].startDate`}
                    value={edu.startDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    variant="outlined"
                    name={`education[${index}].endDate`}
                    value={edu.endDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    name={`education[${index}].description`}
                    value={edu.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            ))}

            {/* Work Experience Section */}
            {resumeData.workExperience.map((work, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Company"
                    variant="outlined"
                    name={`workExperience[${index}].company`}
                    value={work.company}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Position"
                    variant="outlined"
                    name={`workExperience[${index}].position`}
                    value={work.position}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    variant="outlined"
                    name={`workExperience[${index}].startDate`}
                    value={work.startDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    variant="outlined"
                    name={`workExperience[${index}].endDate`}
                    value={work.endDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    name={`workExperience[${index}].description`}
                    value={work.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            ))}

            {/* Skills Section */}
            {resumeData.skills.map((skill, index) => (
              <TextField
                key={index}
                label={`Skill ${index + 1}`}
                variant="outlined"
                name={`skills[${index}]`}
                value={skill}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            ))}

            {/* Certifications Section */}
            {resumeData.certifications?.map((cert, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Certification Name"
                    variant="outlined"
                    name={`certifications[${index}].name`}
                    value={cert.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Issued By"
                    variant="outlined"
                    name={`certifications[${index}].issuedBy`}
                    value={cert.issuedBy}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Issue Date"
                    variant="outlined"
                    name={`certifications[${index}].issueDate`}
                    value={cert.issueDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Expiry Date"
                    variant="outlined"
                    name={`certifications[${index}].expiryDate`}
                    value={cert.expiryDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}

            {/* Languages Section */}
            {resumeData.languages?.map((lang, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Language"
                    variant="outlined"
                    name={`languages[${index}].name`}
                    value={lang.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Proficiency Level"
                    variant="outlined"
                    name={`languages[${index}].proficiencyLevel`}
                    value={lang.proficiencyLevel}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}

            {/* References Section */}
            {resumeData.references?.map((ref, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Reference Name"
                    variant="outlined"
                    name={`references[${index}].name`}
                    value={ref.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Position"
                    variant="outlined"
                    name={`references[${index}].position`}
                    value={ref.position}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company"
                    variant="outlined"
                    name={`references[${index}].company`}
                    value={ref.company}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Contact Info"
                    variant="outlined"
                    name={`references[${index}].contactInfo`}
                    value={ref.contactInfo}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save Resume
            </Button>
         
          </form>
        </Box>
    </Modal>
  );
};


