import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { searchSongs } from '../../constants/commonFunctions';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    paddingLeft: '0px !imporatant',
  },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

export default function Search(props) {
  const classes = useStyles();
  const { history } = props;

  const [searchsonglist, setSearchsonglist] = useState([])
  const [searchInput, setSearchInput] = useState([])

  const searchSong = () => {
    console.log('onsubmit', searchInput);
    const userId = 1;
    searchSongs({
      query: `query{
      search(searchStr:"${searchInput}",userId:${userId}){
      id
      title
       image{
         low
         mid
         high
         basepath
       },
       artist{
        firstname
        lastname
        id
      },
      playlists{
        id
        title
      },
      isLiked
      duration
      source
      }
      }`
    }).then((response) => {
      setSearchsonglist(response.data.data.search);
      if (response.data.data.search.length > 0) {
        props.searchSongs(response.data.data.search);
      } else {
        props.searchSongs(response.data.data.search, 'No Record Found');
      }
    }).catch((error) => {
      console.log('error', error)
    });
  }

  const onChange = (event) => {
    setSearchInput(event.target.value);
  };
    const buttonStyles = {
      position: 'absolute',
      marginLeft: '-40px',
      marginTop: '-5px'
    }
  return (
    <div className={classes.search} style={{ maxHeight: 50}}>
      <InputBase
        placeholder="Search…"
        onChange={onChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={searchSong}
        style={buttonStyles}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}
