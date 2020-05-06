import React from 'react';

import '../groupSongs.scss';
import Group from '../group';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../../environment';


const MoodsSongs = () => {

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
            query MoodsSongsQuery {
                allmoods { 
                  id 
                  name 
                  description   
                  image{
                    low
                    mid
                    high
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
          <div className="boxview">
            {(response.allmoods || []).map((item, index) => (
              <Group item={item} key={index} type={'moods'}/>
            ))}
          </div>);
      }}
    />
  );
}

export default MoodsSongs;