import React from 'react';

import './groupSongs.scss';
import Group from './group';

const GroupSongs = (props) => {
  
  const {list, type } = props;  
    return (
      <div className="boxview">
        {(list || []).map((item,index) => (
          <Group item={item} key={index} type={type}/>
        ))}
      </div>
    );
  }

export default GroupSongs;