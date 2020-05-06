import React from 'react';

import { loadingActions } from '../../redux';
import crop from '../../images/crop.jpg';

const Group = (props) => {

  const { item, key, type } = props;
  
    const handleClick = (item) => {
      loadingActions.selectedGroup({type: type, payload: item});
    }
    return(
      <div className="box" key={key} onClick={() => handleClick(item)}>
        <img src={item.image ? item.image.basepath+item.image.high : crop} />
        <p className="title">{item.name || item.title || item.firstname}</p>
      </div>
    )
};

export default Group;