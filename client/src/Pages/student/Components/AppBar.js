import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AppBar from '@material-ui/core/AppBar';

export default function appBar(){
    return(
    <AppBar position="relative">
        <Toolbar>
            <AccountBoxIcon/>
            <Typography variant="h6" color="inherit" noWrap>
                Examinator
          </Typography>
        </Toolbar>
    </AppBar>
    )
};
