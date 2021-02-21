import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

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
                        <h2 id="transition-modal-title">Tra nsition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                        <Scheduler />
                    </div>
                </Fade>
            </Modal>
            </div>

    );
}