import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const AppHeader: React.FC = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <Typography variant='h4'>
                    The Employable Dev
                </Typography>
                </Box>
                <ConnectButton />  
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;
