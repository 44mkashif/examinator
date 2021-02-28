import React from 'react';
import AppBar from './Components/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';

import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '60rem', height: '1rem' },
    borderColor: 'text.primary',
};



export default function Exam() {

    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <React.Fragment>
            <AppBar />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <div>
                                <Typography variant="h1" component="h2" gutterBottom>
                                    Exam Name
                                </Typography>
                                <Box borderTop={1} {...defaultProps} />
                                <Typography variant="body1" gutterBottom>
                                    Instructor
                                 </Typography>
                            </div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label=" Pledge: I promise to answer myself without help from anyone."
                            />

                        </Paper>

                        <Button 
                        variant="contained" 
                        color="primary"
                        component={Link} to="./Exam">
                        Start Now!
                        </Button>
                        
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}