import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { signIn, signOut, useSession } from 'next-auth/react';



const AppHeader: React.FC = () => {
    
    const { data: session } = useSession();
    const handleAuth = (provider?: 'github'|'linkedin') => {
        if (session) {
            signOut();
            } else if (provider) {
                signIn(provider);
        }
    };
    return(
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <Typography variant='h4'>
                    The Employable Dev
                </Typography>
                </Box>
                <ConnectButton />  
                {session ? (
                    <Button color='inherit' onClick={() => handleAuth('github')}>
                        Logout
                    </Button>
                ):(
                    <>
                    <Button color='inherit' onClick={()=>handleAuth()}>Login</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
