import React, { useState, useEffect, useRef, useMemo } from 'react';

// Assuming initialState is meant for useState
const initialState = 0;

// Assuming initialValue is meant for useRef
const initialRefValue = 1000;

// Function to compute factorial (expensive computation)
const computeFactorial = (num: number) => {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
};

export const useLessHook = () => {
  const [number, setNumber] = useState(initialState);
  const myRef = useRef(initialRefValue);

  // Define the incrementNumber function here
  const incrementNumber = () => setNumber((prevNumber: number) => prevNumber + 1);

  const factorial = useMemo(() => computeFactorial(number), [number]);

  useEffect(() => {
    console.log(`Factorial of ${number} is ${factorial}`);

    return () => {
      // Cleanup logic here (if necessary)
    };
  }, [factorial, number]); // Dependency array

  // Example of using the ref
  console.log(myRef.current);

  // Return the factorial and the incrementNumber function
  return {
    factorial,
    incrementNumber
  };
};

export default useLessHook;