// components/GreetingCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

type CardProps = {
  children?: React.ReactNode;
  // ... other props
};

const Cards: React.FC<CardProps> = ({children}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>    <Card sx={{ maxWidth: 345, justifyContent:'Center', margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        CV and contact information...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          take a look at Saul`s CV and his Work Experience. Call to schedule and appointment for an interview and connect towards your mutual goals. click below to find out more...<p></p>
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Check Out CV
        </Button>
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sauls Portfolio
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Look at some of sauls work including his public gits and see whether the codebases are up to par. If you see something you do or don`t like take notes and be sure to ask him in the interview about it.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          View Portfolio
        </Button>
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Find out more about Saul... 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          talk with a large language model created by Saul using langchain.js, pinecone, ChatGPT4 and typescript. Ask it any question about him and the output from the module will be honest about his character. It is trained on his codebases. 
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </CardContent>
    </Card>
    
    </div>
  );
};

export default Cards;