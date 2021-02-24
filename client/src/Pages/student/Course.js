import React from 'react';
import AppBar from './Components/AppBar';


import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuItem from '@material-ui/core/MenuItem';

import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';




export default function Course() {

    //Popper Menu Functions

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //Popper Idhr tk he

    //Routing Functions
    const history = useHistory();

    const navigateTo = (path) => history.push(path);

    return (
        <React.Fragment>
            <AppBar />
            <div>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <AssignmentIcon />
            Exam
          </Button>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={event => { navigateTo('../teacher/course?id=1/Schedule') }}>Start an Instant Exam</MenuItem>
                    <MenuItem onClick={handleClose}>Schedule an Exam</MenuItem>
                    <MenuItem onClick={handleClose}>Reschedule an Exam</MenuItem>
                </Menu>
            </div>
        </React.Fragment>

    )
};
