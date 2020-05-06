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
  } = props;

  console.log('enter in modalPlaylist',song.playlists);

  useEffect(() => {
    console.log('enter in useeffect')
    loadPlaylistData(1);
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
        console.log('in response playlists',song.playlists);
        let newlist = userPlaylist.filter(item => !song.playlists.find(obj => obj.id === item.id));
        console.log('userplaylist',newlist);

        setUserPlaylists(newlist);
      }
    }).catch((error) => {
      console.log('error', error)
    });
    
    console.log('userplaylist',userPlaylists);
  }

  const handleChanage = (id, e) => {
    console.log('enter in halechange',id);
    const playlist = selectedPlaylist;
    if(e.target.checked){
      playlist.push(id);
    } else {
      playlist.splice(playlist.indexOf(id), 1);
    }
    setSelectedPlaylist(playlist);
  }

  const addToPlayList = () => {
    addSongsToPlaylist(song.id, selectedPlaylist.toString());
    toggle();
  }

  const addSongsToPlaylist =  (songIds, playlistIds) => {
    addSongInPlaylists({
      query: `mutation{
        addSongToPlaylist(songId: "${songIds}", playlistId:"${playlistIds}"){
          message
          success
        }
      }`
      }).then((response) => {
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
              <Button onClick={addToPlayList}>Add</Button>{' '}
              <Button onClick={() => toggle(song)}>Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalPlaylist;