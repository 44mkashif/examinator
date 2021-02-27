import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase'; 
import { useHistory } from 'react-router-dom';
import logoImg from './../../assets/navbar-2.png';
import Toolbar from '@material-ui/core/Toolbar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     padding: theme.spacing(2),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },
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
    button: {
        borderRadius: 100,
        padding: 10
      },
    extendedIcon: {
        color: theme.palette.primary.contrastText,
        marginRight: 5
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    buttonText: {
        color: theme.palette.primary.contrastText,
    },
    logoImg: {
        width: 40,
        marginRight: 10
    },
    datePicker:{
        borderRadius: 100
    },
    card: {
        width: 300,
        margin: theme.spacing(1, 3, 2),
        // display: 'flex',
        // flexDirection: 'column',
      },
    editClass: {
        color: theme.palette.secondary.dark
    },
    deleteClass: {
        color: theme.palette.error.main
    },
    textField: {
        [`& fieldset`]: {
          borderRadius: 100,
          borderWidth: '2px'
        }
    },
}));

var exams = ['Midterm Exam', 'Final Term'];

export default function Course() {

    const history = useHistory();
    const navigateTo = (path) => history.push(path);
    const classes = useStyles();
    const [openMenu, setOpenMenu] = React.useState(false);
    const handleOpenMenu = () => {
        setOpenMenu(true);
    };
    const handleCloseMenu = () => {
        setOpenMenu(false);
    };
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };



    return (
        <React.Fragment>   
            <AppBar position="relative">
                <Toolbar>
                    <Grid container spacing={2} justify='space-between' alignItems='center'>
                        <div>
                            <Grid container>
                                <img src={logoImg} alt="logo" className={classes.logoImg} />
                                <Typography variant="h6" color="inherit" noWrap>
                                Introduction to Data Science
                                </Typography>
                            </Grid>
                        </div>
                        <div>
                            <Button raised className={classes.button} onClick={handleOpenMenu}>
                                <AccessTimeIcon className={classes.extendedIcon} />
                                <Typography className={classes.buttonText}>
                                Schedule Exam
                                </Typography>
                            </Button>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <Container className={classes.cardGrid}>
                    <Grid container spacing={4} justify="center">
                        {exams.map((exam) => (
                            <div key={exam} className={classes.card}>
                                <ButtonBase
                                    onClick={event => { navigateTo('../instructor/course/exam') }}
                                >
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {exam}
                                                </Typography>
                                                <Typography>
                                                    12/12/21 10:00 PM
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Grid container spacing={2} 
                                                justify='space-between' 
                                                alignItems='center'
                                                >
                                                    <IconButton className={classes.editClass}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton className={classes.deleteClass}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </CardActions>
                                    </Card>
                                </ButtonBase>
                            </div>
                        ))}
                    </Grid>
                </Container>
                </div>
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
                        <form className={classes.form} noValidate>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="standard-basic"
                                label="Exam Name"
                                autoComplete="off"
                                autoFocus
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="standard-basic"  
                                label="No of Questions"
                                type='number'
                                autoComplete="off"
                            />
                        </form>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify='space-between' alignItems='center'>
                                <div style={{paddingRight: 10}}>
                                   <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Exam Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    className={classes.textField}
                                    inputVariant="outlined"
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    /> 
                                </div>
                                <div style={{paddingLeft: 10}}>
                                    <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Exam Time"
                                    value={selectedDate}
                                    inputVariant="outlined"
                                    className={classes.textField}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    />
                                </div>
                                
                                
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <br/>
                        <Grid container spacing={2} justify='space-between' alignItems='center'>
                                <Button 
                                    variant="contained" 
                                    color="secondary.dark" 
                                    className={classes.button} 
                                    style={{width:'48%'}} 
                                    onClick={handleCloseMenu}
                                >
                                    Close
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    style={{width:'48%'}} 
                                    className={classes.button}  
                                    onClick={event => { navigateTo('../instructor/course/Paper') }}
                                >
                                    Save
                                </Button>    
                        </Grid>                    
                    </div>
                    </Fade>
                </Modal>      
        </React.Fragment>
          
    );
}
