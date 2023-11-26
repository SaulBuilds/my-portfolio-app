//my-portfolio-app/components/Card.tsx

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export const HomeCards = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      <Card
        sx={{ justifyContent: "center", maxWidth: 345, margin: "auto", mt: 5 }}
      >
        <CardContent sx={{ justifyContent: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            CV and Contact info...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Take a look at my CV and Work experience. Call or email me to
            schedule an appointment for an interview and connect towards mutual
            goals. click below to find out more...
            
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Check Out CV
          </Button>
        </CardContent>
      </Card>
      <Card
        sx={{ justifyContent: "center", maxWidth: 345, margin: "auto", mt: 5 }}
      >
        <CardContent sx={{ justifyContent: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            Sauls Portfolio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Look at some of sauls work including his public gits and see whether
            the codebases are up to par. If you see something you do or don`t
            like take notes and be sure to ask him in the interview about it.
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            View Portfolio
          </Button>
        </CardContent>
      </Card>
      <Card
        sx={{ justifyContent: "center", maxWidth: 345, margin: "auto", mt: 5 }}
      >
        <CardContent sx={{ justifyContent: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            Find out more about Saul...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            talk with a large language model created by Saul using langchain.js,
            pinecone, ChatGPT4 and typescript. Ask it any question about him and
            the output from the module will be honest about his character. It is
            trained on his codebases.
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Talk With Larry`s
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
