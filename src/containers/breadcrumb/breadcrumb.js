import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import './breadcrumb.scss';

const PlaylistBreadcrumb = (props) => {
  const { items, back } = props;
  
  return (
    <div>
      <Breadcrumb>
          {items.map((item,index) => (
            <BreadcrumbItem key={index} onClick={back}><a style={{cursor: `${index === 0 ? 'pointer' : 'default'}`}}>{item}</a></BreadcrumbItem>
          ))}
      </Breadcrumb>
    </div>
  )
}
export default PlaylistBreadcrumb;