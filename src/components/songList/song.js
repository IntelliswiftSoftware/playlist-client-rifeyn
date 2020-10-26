import React, {useState} from 'react';

import FavoriteIcon from '@material-ui/icons/Favorite';
import QueueIcon from '@material-ui/icons/Queue';
import DeleteIcon from '@material-ui/icons/Delete';
import { loadingActions } from '../../redux';
import { addToPlayedSongs } from '../../constants/commonFunctions';
import ModalPlaylist from '../../containers/modalPlaylist';
import crop from '../../images/crop.jpg';

const Song = (props) => {
  
  const { item, key, userId } = props;
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [operationSong, setoperationSong] = useState({});
  const [oprationFlag, setoprationFlag] = useState('');
  const [liked, setLiked] = useState(item.isLiked);


  const toggle = (song, flag) => {
    setOpenPlaylistModal(!openPlaylistModal);
    setoperationSong(song);
    setoprationFlag(flag);
  }
    const playSong = (item) => {
      loadingActions.setSong(item);
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
      if(liked) {
        addToPlayedSongs({
          query: `mutation{
            unlikeSong(songId:${item.id},userId:${userId}){
              success
              message
            }
          }`
          }).then((response) => {
            if(response) {
              setLiked(false);
            }
        }).catch((error) => {
          console.log('error',error)
        });
      } else {
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
  }
    
    return (
        <div className="list no-gutters" key= {key}>
            <div className="thumbnail"><img src={item.image ? item.image.basepath+item.image.high: crop} /></div>
            <div className="title col-5" onClick={() => playSong(item)}>
              <h3>{item.title}<span>{item.firstname}</span></h3>
            </div>
            <div className="tracktime col-2">{item.duration}</div>
            <div className="actions col-3">
              <div className="fav active">
                <FavoriteIcon style={{ color: liked ? '#8e2929' : '#ffffff' }} onClick={() => songLiked(item)} />
              </div>
              <div className="add">
                <QueueIcon style={{ color: '#ffffff' }} onClick={(e) => toggle(item, 'add')}/>
              </div>
              <div className="add">
                <DeleteIcon style={{ color: '#ffffff' }} onClick={(e) => toggle(item, 'delete')}/>
              </div>
            </div>
            { openPlaylistModal &&
            <ModalPlaylist
              song={operationSong}
              modal={openPlaylistModal}
              toggle={toggle}
              flag={oprationFlag}
              userId={userId}
            />
            }
          </div>
    )
}

export default Song;