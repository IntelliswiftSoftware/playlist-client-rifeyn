import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import './breadcrumb.scss';

const PlaylistBreadcrumb = (props) => {
  
  return (
    <div>
      <Breadcrumb>
          {props.items.map((item,index) => (
            <BreadcrumbItem key={index}><a>{item}</a></BreadcrumbItem>
          ))}
      </Breadcrumb>
    </div>
  )
}
export default PlaylistBreadcrumb;