import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import '../modalCreateNew/modalCreateNew.scss';

import { getUserPlayList,addSongInPlaylists } from '../../constants/commonFunctions';

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
            <h4>User Playlist</h4>
            <div className='margin17'>
              {(userPlaylists || []).map((item, index) => (
                <div className='row' key={index}>
                  <div className='col-lg-12'>
                    <input type='checkbox' onChange={(e) => handleChanage(item.id, e)} />
                    <span>{item.title}</span>
                  </div>
                </div>
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