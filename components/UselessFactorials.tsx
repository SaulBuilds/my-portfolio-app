import React from "react";
import useLessHook from "../hooks/useLessHookDemo";
import { Card, CardContent, Typography, Button } from '@mui/material';

export const UseLessFactorials: React.FC = () => {
  // Using the custom hook useLessHook
  const { factorial, incrementNumber } = useLessHook();

  // Logging to demonstrate the hook's functionality
  console.log("Current factorial value:", factorial);

  // Function to handle button click
  const handleButtonClick = () => {
    console.log("Incrementing number...");
    incrementNumber();
  };

  return (
    <div className="sample-component">
      <Card>
        <CardContent>
          <Typography variant="h5">Factorial Demo</Typography>
          <Typography variant="body2">
            Current Factorial: {factorial}
          </Typography>
          <Button variant='contained' onClick={handleButtonClick}>
            Increment Number
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
