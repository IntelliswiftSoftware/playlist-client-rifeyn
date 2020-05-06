import React from 'react';

import '../groupSongs.scss';
import Group from '../group';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../../environment';


const GenreSongs = () => {

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
            query GenreSongsQuery {
                allGenres{
                    id
                  name
                  ismood
                  imageid
                    description
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
        return (
          <div className="boxview">
            {(response.allGenres || []).map((item, index) => (
              <Group item={item} key={index} type={'genre'} />
            ))}
          </div>);
      }}
    />
  );
}

export default GenreSongs;