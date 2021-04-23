import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../../App.css';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Examinator
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer && "footer"}>
            <Typography variant="h6" align="center" gutterBottom>
                Examinator
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Smart Examination System
            </Typography>
            <Copyright />
        </footer>
    )
};