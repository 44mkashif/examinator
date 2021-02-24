import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import { useHistory } from 'react-router-dom';

import Scheduler from './Schedule';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

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
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function ScheduleButton() {

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
            <Fab color="primary" aria-label="add" className={classes.margin} onClick={handleOpenMenu}>
                    <AccessTimeIcon />
                </Fab>

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
                        <h2 id="transition-modal-title">Schedule Exam</h2>

                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Exam Name" />
                        </form>

                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="standard-basic" label="No of Questions" type='number' />
                        </form>

                        <Scheduler />
                        <br/>
                        <Button variant="contained" color="primary" onClick={event => { navigateTo('../instructor/course/paper') }}>
                            Save
                        </Button>

                    </div>
                </Fade>
            </Modal>
            </div>

    );
}