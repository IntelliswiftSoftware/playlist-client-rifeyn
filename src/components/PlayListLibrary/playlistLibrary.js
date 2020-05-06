
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Group from '../../components/groupSongs/group';
import createNewImg from '../../images/ic_library_add_24px@2x.png';

import PlaylistBreadcrumb from '../../containers/breadcrumb';
import { getUserPlayList, createUserPlayList, getSongsByPlaylistId } from '../../constants/commonFunctions';
import ModalCreateNew from '../../containers/modalCreateNew';
import SongList from '../songList';
import { loadingActions } from '../../redux';

const PlayListLibraby = (props) => {

  const [playlists, setplaylists] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [songbyPlaylistId, setsongsByPlaylistId] = useState([]);

  const { selectedGroup, userId } = props;

  useEffect(() => {
    loadPlaylistData(userId);
  }, [])

  const createNewPlayList = (item) => {
    setOpenModal(!openModal);
  }

  const loadPlaylistData = (userId) => {
    getUserPlayList({
      query: `query{
       user(id: ${userId}){
       playlists{
         id
         title
         image{
           low
           mid
           high
           basepath
         }
       }
       }
       }`
    }).then((response) => {

      if (response) {
        setplaylists(response.data.data.user.playlists)
      }
    }).catch((error) => {
      console.log('error', error)
    });

  }

  useEffect(() => {
    if(selectedGroup.payload) {
      loadSongListByPlaylistId(selectedGroup.payload.id, userId);
    }
  },[selectedGroup]);

  const backToTab = () => {
    loadingActions.selectedGroup({});
  }

  const loadSongListByPlaylistId = (playlistId,userId) => {
    getSongsByPlaylistId({query:`query {  
      playlists(id:${playlistId},userId:${userId}) { 
        id  
        title 
        image{
          low
          mid
          high
        } 
        songs{ 
          id 
          isLiked
          title
           image{
            low
            mid
            high
            basepath
          }
          playlists{
            id
            title
          }
          artist{
            firstname
            lastname
          }
          duration 
          source 
          genreid  
        } 
      }  
    }`

    }).then((response) => {
      if (response) {
        console.log('response in artist by id', response);
        setsongsByPlaylistId(response.data.data.playlists.songs);
      }
    }).catch((error) => {
      console.log('error', error)
    });
  }

  const addPlaylist = (playlistName) => {
    createUserPlayList({
      query: `mutation{
          addPlaylist(title: "${playlistName}", userId:${userId}){
            message
            success
          }
        }`
    }).then((response) => {
      if (response) {
        loadPlaylistData(1);
      }
    }).catch((error) => {
      console.log('error', error)
    });
  }

  return (
    <div className="conent-box col-lg-12">
      <h1 className="heading">Playlist Library
           <span>Browse by categories below</span>
      </h1>

      <div className="tab-view">
        <section>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: true })}
                >
                  Your Playlists
                     </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={'1'}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    {selectedGroup.type === 'playlist' ?
                      <>
                        {<PlaylistBreadcrumb items={['Your Playlist', selectedGroup.payload.title]} back={backToTab}/>}
                        {<SongList list={songbyPlaylistId} />}
                      </>
                      :
                      <>
                        {<PlaylistBreadcrumb items={['Playlist Library', 'Your Playlist']} />}
                        <div className="boxview">
                          <div className="box" onClick={createNewPlayList}>
                            <div style={{ height: '65%', width: '75%', background: '#121212', borderRadius: '18px' }}>
                              <img src={createNewImg} style={{ margin: '17px' }} />
                            </div>
                            <p className="title">{'Create New'}</p>
                          </div>
                          {(playlists || []).map((item, index) => (
                            <Group item={item} key={index} type={'playlist'} />
                          ))}
                        </div>
                      </>}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </section>
      </div>
      <ModalCreateNew modal={openModal} toggle={createNewPlayList} createItem={addPlaylist} />
    </div>
  );

}

const mapStateToProps = state => ({
  selectedGroup: state.utilsReducer.selectedGroup,
  userId: state.utilsReducer.userDetails.id
})

export default connect(mapStateToProps)(PlayListLibraby);