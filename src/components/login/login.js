import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login } from '../../constants/commonFunctions';
import { loadingActions } from '../../redux';
import RiFeyn from '../../images/RiFeyn Final-01.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#121212 !important',
    '&:hover button': {
      color: 'black',
      backgroundColor: '#282828 !important'
    },
  },
  login: {
    backgroundColor: '#282828',
    color: '#ffffff',
  },
  root: {
    '& label.Mui-focused': {
     color: 'gray',
      },
     '& .MuiInput-underline:after': {
      borderBottomColor: 'lightgray',
     },
    '& .MuiOutlinedInput-root': {
     '& fieldset': {
     borderColor: 'gray',
     },
     '&:hover fieldset': {
      borderColor: 'gray',
       },
     '&.Mui-focused fieldset': {
       borderColor: 'lightgray',
     },
     },
    },
    input: {
      color: "gray",
    },
    floatingLabelFocusStyle: {
      color: "gray"
  }
}));

const Login = (props) => {
  const [username, setUserNameValue] = useState('');
  const [password, setPasswordValue] = useState('');

  const getData = (e, type) =>{
    if(type === 'email'){
      setUserNameValue(e.target.value);
    }else{
      setPasswordValue(e.target.value);
    }
  }
  
  const submitLogin = () =>{
    const {history} = props
    const data = { 
    "username": username, 
    "password": password 
    }
    login(data).then((response) => {
      if(response){
        loadingActions.loginData(response.data);
        loadingActions.userDetails(response.data);
        history.push('/dashboard');
      }
    });
  }


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.login}>
      <CssBaseline />
      <div className={classes.paper}>
        <img src={RiFeyn} style={{width: '157px', height: '50px'}} />
        <Typography component="h1" variant="h5">
        <span style = {{color: "lightgray"}}>Sign in</span>
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className={classes.root}
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
          }}
            onChange = {(e)=> getData(e, 'email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.root}
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            onChange = {(e)=> getData(e, 'password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick = {()=> submitLogin()}
          >
            <span style = {{color: "lightgray"}}>Sign In</span>
          </Button>
        </div>
      </div>
    </Container>
  );
}
export default Login;