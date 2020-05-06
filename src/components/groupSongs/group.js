import React from 'react';

import { loadingActions } from '../../redux';

const Group = (props) => {

  const { item, key, type } = props;
  
    const handleClick = (item) => {
      loadingActions.selectedGroup({type: type, payload: item});
    }
    return(
      <div className="box" key={key} onClick={() => handleClick(item)}>
        <img src={item.image.basepath+item.image.high} />
        <p className="title">{item.name || item.title || item.firstname}</p>
      </div>
    )
};

export default Group;