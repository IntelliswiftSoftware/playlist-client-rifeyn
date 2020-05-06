import React, { useState } from 'react';
import '../songList.scss';
import Song from '../song';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../../environment';


const NewReleaseSongList = (props) => {

  const [dropdownOpen, setDropdownOpen] = useState([]);

  const toggle = (id) => {
    let dropdownvalue = [];
    dropdownvalue[id] = !dropdownOpen[id];
    console.log('id', id)
    setDropdownOpen(dropdownvalue);
  }
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
          query NewReleaseSongListQuery {
            newReleaseSongs(pageNumber:1, pageSize: 10, userId:1 ){     
              id,   
              title,  
              isLiked
              source,  
              image{  
                low,  
                mid,  
                high  
               
              },  
               
              artist{  
                firstname,  
                lastname,  
                gender,  
                image{  
                  low  
                }  
              }     
            }     
          }    
        `}
      variables={{}}
      render={({ error, props: response }) => {
        if (error) {
          console.log('Error in grp', error)
          return <div>Error!: error</div>;
        }
        if (!response) {
          console.log('query in if', response)
          return <div>Loading...</div>;
        }
        console.log('query', response)
        return (
          <div className="listview" >
            {(response.newReleaseSongs || []).map((item, index) => (
                <Song item={item} key={index} />
              ))
            }
          </div>);
      }}
    />
  );
}

export default NewReleaseSongList;