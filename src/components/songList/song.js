import React, {useState} from 'react';

import FavoriteIcon from '@material-ui/icons/Favorite';
import QueueIcon from '@material-ui/icons/Queue';
import DeleteIcon from '@material-ui/icons/Delete';
import { loadingActions } from '../../redux';
import { addToPlayedSongs } from '../../constants/commonFunctions';
import ModalPlaylist from '../../containers/modalPlaylist';

const Song = (props) => {
    
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [operationSong, setoperationSong] = useState([]);
    const [liked, setLiked] = useState(false);
    const { item, key } = props;

    const toggle = (song) => {
      console.log('enter in toggle', song)
      setOpenPlaylistModal(!openPlaylistModal);
      setoperationSong(song);
    }
    const playSong = (item) => {
      loadingActions.setSong(item);
      const userId = 1;
      addToPlayedSongs({
        query: `mutation{
          playSong(userId:${userId}, songId: ${item.id}, playCount: 1){
            message
            success
          }
        }`
        }).then((response) => {
          if(response) {
          }
      }).catch((error) => {
        console.log('error',error)
      });
    }

    const songLiked = (item) => {
      const userId = 1;
      addToPlayedSongs({
        query: `mutation{ 
          likeSong(userId:${userId},songId:${item.id}){
           message
            success
          }
        }`
        }).then((response) => {
          if(response) {
            setLiked(true);
          }
      }).catch((error) => {
        console.log('error',error)
      });
    }
    console.log('openPlaylistModal[operationSong.id]',openPlaylistModal);
    
    return (
        <div className="list no-gutters" key= {key}>
            <div className="thumbnail"><img src={item.image.basepath+item.image.low} /></div>
            <div className="title col-5" onClick={() => playSong(item)}>
              <h3>{item.title}<span>{item.artist.firstname}</span></h3>
            </div>
            <div className="tracktime col-2">{item.duration}</div>
            <div className="actions col-3">
              <div className="fav active">
                <FavoriteIcon style={{ color: item.isLiked || liked ? '#8e2929' : '#ffffff' }} onClick={() => songLiked(item)} />
                {/* <i className="fa fa-heart"></i> */}
              </div>
              <div className="add">
                <QueueIcon style={{ color: '#ffffff' }} onClick={(e) => toggle(item)}/>
              </div>
              <div className="add">
                <DeleteIcon style={{ color: '#ffffff' }} onClick={(e) => toggle(item)}/>
              </div>
            </div>
            { openPlaylistModal &&
            <ModalPlaylist song={operationSong} modal={openPlaylistModal} toggle={toggle}/>
            }
          </div>
    )
}

export default Song;