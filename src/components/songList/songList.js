import React, { useState } from 'react';
import './songList.scss';
import Song from './song';

const SongList = (props) =>  {
  const { list,userId } = props;

    return (
      <div className="listview">
        
        {list.length ?
         (list || []).map((item, index) => (
            <Song item={item} key={index} userId={userId}/>
          ))
          :
          'Loading...'
        }
      </div>
    )
}

export default SongList;