import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { useHistory } from 'react-router-dom';

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
            <Fab color="secondary" aria-label="add" className={classes.margin} onClick={event => { navigateTo('../instructor/course/paper') }}>
                <AssignmentIcon />
                </Fab>
            </div>

    );
}