/* eslint-disable react/jsx-no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import QueueIcon from '@material-ui/icons/Queue';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HistoryIcon from '@material-ui/icons/History';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';


import Search from '../searchBox';
import SearchResult from '../../components/searchResult';
import UsetProfile from '../userProfile';
import Home from '../../components/home';
import PlyalistLibrary from '../../components/PlayListLibrary/';
import LikedSongs from '../../components/likedSongs';
import RecentlyPlayedSong from '../../components/RecentlyPlayedSong';
import RiFeyn from '../../images/RiFeyn Final-01.png';
import { loadingActions } from '../../redux';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#121212',
    color: '#ffffff',
    display: 'block'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#121212',
    color: '#ffffff',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#121212',
    color: '#ffffff',
  }, //padding: theme.spacing(3),
  moreIcon: {
    float: 'right',
    marginTop: '22px',
    color: '#fff',
  },
  subMenu: {
    marginLeft: "12px !important",
  }
}));

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const { history, userDetails } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let [MenuComponent, setMenus] = React.useState(<Home userId={userDetails.id}/>);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const setComponent = (name) => {
    loadingActions.selectedGroup({});
    setMobileOpen(false);
    setMenus(name);
  }

  const searchSongs = (searchResult, meassage) => {
    setMenus(<SearchResult list={searchResult} meassage={meassage}/>);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} >
        <List className={classes.root}>
          <ListItem style={{ marginLeft: '28px'}}>
            <img style={{width: '100%', height: '100%'}} src={RiFeyn} />
          </ListItem>
        </List>
        
      </div>
      <Divider />
      <List>
          {/* {['Home', 'Playlist Library', 'Songs Library'].map((text, index) => ( */}
            <ListItem button key='Home' onClick={() => setComponent(<Home userId={userDetails.id}/>)}>
              <Tooltip disableFocusListener title="Home">
                <ListItemIcon><HomeIcon style={{ color: '#ffffff' }}/></ListItemIcon>
              </Tooltip>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem button onClick={() => setComponent(<PlyalistLibrary userId={userDetails.id}/>)}>
              <ListItemIcon>
              <PlaylistPlayIcon style={{ color: '#ffffff' }}/>
              </ListItemIcon>
              <ListItemText primary="Your Playlists" />
            </ListItem>
            <ListItem button key='songlist'>
              <Tooltip disableFocusListener title="Song Library">
                <ListItemIcon><QueueMusicIcon style={{ color: '#ffffff' }}/></ListItemIcon>
              </Tooltip>
              <ListItemText primary='Song Library' />
            </ListItem>
              <List className={classes.subMenu} component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => setComponent(<LikedSongs userId={userDetails.id}/>)}>
                  <ListItemIcon>
                    <FavoriteIcon style={{ color: '#ffffff' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Liked Songs" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={() => setComponent(<RecentlyPlayedSong userId={userDetails.id}/>)}>
                  <ListItemIcon>
                    <HistoryIcon style={{ color: '#ffffff' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Recently Played" />
                </ListItem>
              </List> 
          {/* ))} */}
        </List>
    </div>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Search  history={history} searchSongs={searchSongs}/>
          <UsetProfile history={history} />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {MenuComponent}
      </main>
    </div>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = state => ({
  userDetails: state.utilsReducer.userDetails
})
export default connect(mapStateToProps)(ResponsiveDrawer);
