import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Container, Row, Col} from 'reactstrap'

import { loadingActions } from '../../redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconRight : {
    float: 'right !important',
  }
}));

const UserProfile = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { history, userDetails } = props;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth =  true;
  
  
  const logout = () => {
    handleClose();
    history.push('/login');
    loadingActions.loginData({});
    loadingActions.userDetails({});
  }
let isMobile = window.innerWidth < 500 ? true : false;
  return (
    <div className={classes.root}>
          {auth && (
            <div className={classes.iconRight}>
              <Container>
                <Row>
                <Col className='d-none d-lg-block' lg={8} style={{
                  textAlign: 'right'
                }}> 
                  <span>{`${userDetails.firstname} ${userDetails.lastname}`}</span>
                </Col>
                <Col xs={12} lg={3}>  
                  <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                </Col>
              </Row>
              </Container>
              {/* <ArrowDropDownIcon /> */}
             
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
    </div>
  );
}
const mapStateToProps = state => ({
  userDetails: state.utilsReducer.userDetails
})

export default connect(mapStateToProps)(UserProfile);
