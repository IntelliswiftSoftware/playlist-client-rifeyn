import React, { useState } from 'react';
import './songList.scss';
import Song from './song';

const SongList = (props) =>  {
  const { list,userId, message } = props;
  console.log('message',message);
    return (
      <div className="listview">
         {(list || []).map((item, index) => (
            <Song item={item} key={index} userId={userId}/>
          ))}
          {message && <span>{message}</span>}
      </div>
    )
}

export default SongList;