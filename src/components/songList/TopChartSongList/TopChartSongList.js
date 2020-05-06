import React, { useState } from 'react';
import '../songList.scss';
import Song from '../song';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../../environment';


const TopChartSongList = (props) => {

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
          query TopChartSongListQuery {
            mostlikedSongs(userId:1){     
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
          <div class="listview" >
            {(response.mostlikedSongs || []).map((item, index) => (
                <Song item={item} key={index} />
              ))
            }
          </div>);
      }}
    />
  );
}

export default TopChartSongList;