import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';

import '../modalCreateNew/modalCreateNew.scss';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getUserPlayList,addSongInPlaylists } from '../../constants/commonFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#6c757d",
    '& .MuiCheckbox-root': {
      color: "#6c757d" 
    }
  }
}));

const ModalPlaylist = (props) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const {
    toggle,
    modal,
    song,
    flag,
    userId
  } = props;
  const classes = useStyles();

  useEffect(() => {
    loadPlaylistData(userId);
  }, [])

  const loadPlaylistData = (userId) => {
    getUserPlayList({
      query: `query{
       user(id: ${userId}){
       playlists{
         id
         title
         image{
           low
           mid
           high
           basepath
         }
       }
       }
       }`
    }).then((response) => {
      if (response) {
        
        let userPlaylist = response.data.data.user.playlists;
        let newlist = [];
        if(flag === 'add') {
          newlist = userPlaylist.filter(item => !song.playlists.find(obj => obj.id === item.id));
        } else {
          newlist = userPlaylist.filter(item => song.playlists.find(obj => obj.id === item.id));
        }
        setUserPlaylists(newlist);
      }
    }).catch((error) => {
      console.log('error', error)
    });
    
  }

  const handleChanage = (id, e) => {
      const playlist = selectedPlaylist;
    if(e.target.checked){
      playlist.push(Number(id));
    } else {
      playlist.splice(playlist.indexOf(Number(id)), 1);
    }
    setSelectedPlaylist(playlist);
  }

  const addToPlayList = () => {
    addSongsToPlaylist((song.id).toString(), selectedPlaylist.toString());
  }

  const addSongsToPlaylist =  (songId, playlistIds) => {
    addSongInPlaylists({
      query: `mutation{
        addSongToPlaylist(songId: "${songId}", playlistId:"${playlistIds}"){
          message
          success
        }
      }`
      }).then((response) => {
        if(response) {
          toggle();
        }
    }).catch((error) => {
      console.log('error',error)
    });
    
  }

  const deleteToPlayList = () => {
    deleteSongsToPlaylist((song.id).toString(), selectedPlaylist.toString())
  }

  const deleteSongsToPlaylist =  (songId, playlistIds) => {
    addSongInPlaylists({
      query: `mutation{    
        deleteSongFromPlaylist(songId:"${songId}", playlistId:"${playlistIds}"){   
        message  
        success    
      }   
    }`
      }).then((response) => {
        if(response) {
          toggle();
        }
    }).catch((error) => {
      console.log('error',error)
    });
    
  }
  
  return (
    <div className='createNewPlaylist'>
      <Modal isOpen={modal} toggle={() => toggle(song)} className='createmodal'>
        <ModalBody>
          <div>
            <h5>Your Playlist</h5>
            <div className='margin17'>
              {(userPlaylists || []).map((item, index) => (
                    <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          onChange={(e) => handleChanage(item.id, e)} 
                          className={classes.root}
                          color="default"
                          />}
                      label={item.title}
                      style = {{color: "#6c757d"}}
                    />
                    </FormGroup>
              ))}
            </div>
            <div className='margin17'>
              {flag === 'add' ?
                <Button onClick={addToPlayList}>Add</Button>
                :
                <Button onClick={deleteToPlayList}>Delete</Button>
              }{' '}
              <Button onClick={() => toggle(song)}>Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalPlaylist;