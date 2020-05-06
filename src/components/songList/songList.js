import React, { useState } from 'react';
import './songList.scss';
import Song from './song';

const SongList = (props) =>  {
  const { list } = props;

    return (
      <div className="listview" >
        {(list || []).map((item, index) => (
            <Song item={item} key={index} />
          ))
        }
      </div>
    )
}

export default SongList;