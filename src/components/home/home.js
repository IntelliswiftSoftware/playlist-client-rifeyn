import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';

import './home.scss';
import SongList from '../songList';
import GroupSong from '../groupSongs';
import PlaylistBreadcrumb from '../../containers/breadcrumb';
import {
  getNewReleaseSongList,
  getTopChartSongList, getMoodsList, getGenerList, getArtistsList,
  getSongsByGenreId, getSongsByMoodId, getSongsByArtistsId
} from '../../constants/commonFunctions';
import { moodsQuery, artistsQuery, generQuery } from '../../constants/queries';

const Home = (props) => {
  const [activeTab, setActiveTap] = useState('1');
  const [newReleaseSongList, setNewReleaseSongList] = useState([]);
  const [topChartSongList, setTopChartSongList] = useState([]);
  const [moodsList, setMoodsList] = useState([]);
  const [artistList, setArtistsList] = useState([]);
  const [generList, setGenerList] = useState([]);
  const [moodSongsById, setMoodSongsById] = useState([]);
  const [genreSongsById, setGenreSongsById] = useState([]);
  const [artistsSongsById, setArtistsSongsById] = useState([]);

  useEffect(() => {
    console.log('component call home useeffect first');
    getNewReleaseSongList({query:`query{newReleaseSongs(pageNumber:1, pageSize: 20, userId:1 ){     
      id,   
      title,  
      duration,
      isLiked
      source,  
      image{  
        low,  
        mid,  
        high  
        basepath
      },  
      playlists{
        id
        title
      },
      artist{  
        firstname,  
        lastname,   
      }     
    }}`}).then((response1) => {
      if (response1) {
        setNewReleaseSongList(response1.data.data.newReleaseSongs)
      }
    }).catch((error) => {
      console.log('error', error)
    });
    getTopChartSongList({query:`query{mostlikedSongs(userId:1){     
      id,   
      title,  
      isLiked,
      duration,
      source,  
      image{  
        low,  
        mid,  
        high  
        basepath
      },  
      playlists{
        id
        title
      },
      artist{  
        firstname,  
        lastname,    
      }     
      }}`}).then((response2) => {
      if (response2) {
        setTopChartSongList(response2.data.data.mostlikedSongs)
      }
    }).catch((error) => {
      console.log('error', error)
    });
    getMoodsList({query: `query{${moodsQuery}}`}).then((response3) => {
      if (response3) {
        setMoodsList(response3.data.data.allmoods);
      }
    }).catch((error) => {
      console.log('error', error)
    });
    getArtistsList({query: `query{${artistsQuery}}`}).then((response4) => {
      if (response4) {
        setArtistsList(response4.data.data.artists)
      }
    }).catch((error) => {
      console.log('error', error)
    });
    getGenerList({query: `query{${generQuery}}`}).then((response5) => {
      if (response5) {
        setGenerList(response5.data.data.allGenres)
        
      }
    }).catch((error) => {
      console.log('error', error)
    });
  }, []);
 
  const toggle = tab => {
    if (activeTab !== tab) setActiveTap(tab);
  }
  const { selectedGroup, userId } = props;

  const loadSongsByMoodId = (moodId) => {
    getSongsByMoodId({query:`query {     
      songByMood(id:${moodId}, userId: ${1} ){     
      id,   
      title,
      duration,
      isLiked,
      source,  
      image{  
        low,  
        mid,  
        high 
        basepath
      }, 
      playlists{
        id
        title
      }, 
      artist{  
        firstname,  
        lastname,  
      }     
      }     
      }`
    }).then((response) => {
      if (response) {
        setMoodSongsById(response.data.data.songByMood);
      }
    }).catch((error) => {
      console.log('error', error)
    });
  }

  const loadSongsByGenreId = (id) => {
    getSongsByGenreId({query:`query{ 
      songsByGenre(genreId:${id}, userId:1){ 
      id 
          isLiked
      genreid 
      image{ 
        low
        mid
        basepath
      } 
      duration 
      title 
      source 
      artist{ 
        firstname
        lastname
      },
      playlists{
        id
        title
      }, 
    } 
  }`
    }).then((response) => {
      if (response) {
        setGenreSongsById(response.data.data.songsByGenre);
      }
    }).catch((error) => {
      console.log('error', error)
    });
  }

  const loadSongsByArtistsId = (id) => {
    getSongsByArtistsId({query:`query{ 
      artists(userId:1,id:${id}){
        id
      firstname
      songs{
        id
        isLiked
        duration 
        title 
        source 
        artist{ 
          firstname
          lastname
        },
        playlists{
          id
          title
        },
        image{ 
          low
          mid
          basepath
        } 
      }  
    } 
  }`

    }).then((response) => {
      if (response) {
        console.log('response in artist by id', response);
        setArtistsSongsById(response.data.data.artists[0].songs);
      }
    }).catch((error) => {
      console.log('error', error)
    });
  }

  useEffect(() => {
     if(selectedGroup.payload) {
       if(selectedGroup.type === 'Moods') {
         loadSongsByMoodId(selectedGroup.payload.id);
       } else if(selectedGroup.type === 'Genre') {
         loadSongsByGenreId(selectedGroup.payload.id);
       } else if(selectedGroup.type === 'Artists') {
         loadSongsByArtistsId(selectedGroup.payload.id);
       }
    }
    
  },[selectedGroup]);

  return (

    <div className="conent-box col-lg-12">
      <h2 className="heading">Home
              <span>Browse by categories below</span>
      </h2>

      <div className="tab-view">
        <section>
          <div>
            <Nav tabs justified>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggle('1'); }}
                >
                  New Releases
                    </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  Top Charts
                    </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { toggle('3'); }}
                >
                  Moods
                    </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => { toggle('4'); }}
                >
                  Genre
                    </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '5' })}
                  onClick={() => { toggle('5'); }}
                >
                  Artists
                    </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    {<PlaylistBreadcrumb items={['Home', 'New Release']} />}
                    {<SongList list={newReleaseSongList} />}
                    {/* {<NewReleaseSongList />} */}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    {<PlaylistBreadcrumb items={['Home', 'Top Charts']} />}
                    {<SongList list={topChartSongList} />}
                    {/* {<TopChartSongList />} */}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    {selectedGroup.type === 'Moods' ?
                      <>
                        {<PlaylistBreadcrumb items={['Moods', selectedGroup.payload.name]} />}
                        {<SongList list={moodSongsById} />}
                      </>
                      :
                      <>
                        {<PlaylistBreadcrumb items={['Home', 'Moods']} />}
                        {<GroupSong list={moodsList} type='Moods' />}
                      </>
                    }
                    {/* {<MoodsSongs />} */}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                  {selectedGroup.type === 'Genre' ?
                    <>
                      {<PlaylistBreadcrumb items={['Genre', selectedGroup.payload.name]} />}
                      {<SongList list={genreSongsById} />}
                    </>
                    :
                    <>
                      {<PlaylistBreadcrumb items={['Home', 'Genre']} />}
                      {<GroupSong list={generList} type='Genre'/>}
                    </>
                  }
                   
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="5">
                <Row>
                  <Col sm="12">
                  {selectedGroup.type === 'Artists' ?
                    <>
                      {<PlaylistBreadcrumb items={['Artists', selectedGroup.payload.firstname]} />}
                      {<SongList list={artistsSongsById} />}
                    </>
                    :
                    <>
                      {<PlaylistBreadcrumb items={['Home', 'Artists']} />}
                      {<GroupSong list={artistList} type='Artists'/>}
                      {/* {<ArtistsSongs />} */}
                    </>
                  }
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </section>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  selectedGroup: state.utilsReducer.selectedGroup,
  userId: state.utilsReducer.userDetails.id
})
export default connect(mapStateToProps)(Home);