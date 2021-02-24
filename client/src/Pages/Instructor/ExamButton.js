import React from 'react';


import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuItem from '@material-ui/core/MenuItem';

import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import Scheduler from './Schedule';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function Exambutton() {

    //Popper Menu Functions

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //Popper

    const classes = useStyles();
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    //Routing Functions
    const history = useHistory();

    const navigateTo = (path) => history.push(path);

    return (
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
                <MenuItem onClick={event => { navigateTo('/Teacher/course/Schedule') }}>Start an Instant Exam</MenuItem>
                <MenuItem onClick={handleOpenMenu}>Schedule an Exam</MenuItem>
                <MenuItem onClick={handleClose}>Reschedule an Exam</MenuItem>
            </Menu>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openMenu}
                onClose={handleCloseMenu}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openMenu}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Tra nsition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                        <Scheduler/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
};
