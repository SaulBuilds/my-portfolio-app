//employable-dev-ep1.0/components/auth/authPortal.tsx

import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const AuthOptions: React.FC = () => {
  const { data: session } = useSession();

  const handleAuth = (provider?: "linkedin" | "github") => {
    if (session) {
      signOut();
    } else if (provider) {
      signIn(provider);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
        <Box sx={{ flexGrow: 0, marginRight: 'auto' }}> {/* Adjusted here */}
          <Image
            className="logo"
            src="/logo1.svg"
            width={250}
            height={50}
            alt="you messed up...program better"
          />
        </Box>
        </Box>

        <ConnectButton />

        {session ? (
          <Button color="inherit" onClick={() => handleAuth()}>
            Sign out
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={() => handleAuth("github")}>
              Login with GitHub
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AuthOptions;
