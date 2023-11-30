//employable-dev-ep1.0/pages/index.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AuthOptions from '../components/Header/AppHeader';
import useAuth from '../hooks/useAuth';
import { Resume } from '../types';
import { ResumeEditor }from '../components/specific/ResumeEditor/ResumeEditor';
import ResumeViewer from '../components/specific/ResumeViewer';
import GreetingCard from '../components/Card'; // Import the GreetingCard component
import { Container, Button, CircularProgress } from '@mui/material';
import ResumeManagement from '../components/specific/ResumeEditor/ResumeManagement';
import { UseLessFactorials } from '../components/UselessFactorials';

const Home = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { isUserAuthenticated, isAdminAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const existingResume: Resume = {
    title: '',
    description: '',
    contact: { email: '', phone: '', address: '', linkedIn: '', website: '' },
    education: [],
    workExperience: [],
    skills: [],
    certifications: [],
    languages: [],
    references: []
};

const handleOpenEditor = () => setIsEditorOpen(true);
const handleCloseEditor = () => setIsEditorOpen(false);
const resumeId = '';

  useEffect(() => {
}, [isUserAuthenticated, isAdminAuthenticated, isLoading, router]);

if (isLoading) {
  return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
      </Container>
  ); 
}


  return (
    <div className={styles.container}>
      <Head>
        <title>The Employable Dev</title>
        <meta
          content="Clean Code By: FOAMLabs"
          name="Portfolio made by Larry Klosowski for 'the Employable Dev'"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <AuthOptions />
      <UseLessFactorials />

{!isUserAuthenticated && (
  <GreetingCard />
)}

{isUserAuthenticated && (
  <ResumeViewer resumeId={"4"} isAuthenticated={isUserAuthenticated} />
)}

{isAdminAuthenticated && (
  <>
    <Button onClick={handleOpenEditor} sx={{ color: 'black' }} variant="contained">
      Create or Edit Your Resume
    </Button>
    {isEditorOpen && (
      <ResumeManagement />
    )}
  </>
)}
</div>
);
};

export default Home;