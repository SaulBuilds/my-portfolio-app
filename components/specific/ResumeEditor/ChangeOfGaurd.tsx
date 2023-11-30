import React, { useState } from "react";
import { AdminSetterABI } from "../../../smartContracts/ApplicationBinaryInterfaces/adminSetterABI";
import {
  useAccount,
  useContractWrite,
} from "wagmi";
import { Box, Button, Card, CardContent, TextField } from "@mui/material";

const contractAddress = "0x6b3fd5F8DdEe40711AE3E6b387f64EE727DDc1a1";

export const ChangeOfGaurd = () => {
  const { address, connector } = useAccount();
  const [newAdminAddress, setNewAdminAddress] = useState(""); // State for the new admin address

  const {
    write: setAdmin,
    isLoading,
    isSuccess,
    data,
  } = useContractWrite({
    address: contractAddress,
    abi: AdminSetterABI,
    functionName: "setAdminAddress",
    args: [newAdminAddress],
    chainId: 5,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAdminAddress(event.target.value); // Update the state with the new value
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAdmin(); // Call the setAdmin function
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="New Admin Address"
              variant="outlined"
              name="newAdminAddress"
              value={newAdminAddress}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit">Set New Admin</Button>
          </form>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </CardContent>
      </Card>
    </Box>
  );
};