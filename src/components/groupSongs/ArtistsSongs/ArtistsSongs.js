import React from 'react';

import '../groupSongs.scss';
import Group from '../group';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../../environment';


const ArtistSongs = () => {

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
            query ArtistsSongsQuery {
                artists{
                    firstname
                    lastname
                    image{
                      low
                      mid
                      high
                    }
                    gender
                  }     
            }    
          `}
      variables={{}}
      render={({ error, props: response }) => {
        if (error) {
          return <div>Error!: error</div>;
        }
        if (!response) {
          return <div>Loading...</div>;
        }
        console.log('artits list',response.artists)
        return (
          <div className="boxview">
            {(response.artists || []).map((item, index) => (
              <Group item={item} key={index} type={'artists'}/>
            ))}
          </div>);
      }}
    />
  );
}

export default ArtistSongs;