
 import React from "react";
 import classnames from 'classnames';
 import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
 import Group from '../../components/groupSongs/group';
 import createNewImg from '../../images/ic_library_add_24px@2x.png';

 import PlaylistBreadcrumb from '../../containers/breadcrumb';
 import { getUserPlayList, createUserPlayList } from '../../constants/commonFunctions';
 import ModalCreateNew from '../../containers/modalCreateNew';

 class PlayListLibraby extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       playlists: [],
       openModal: false,
     }
   }

   componentDidMount () {
     this.loadPlaylistData(1);
   }

  createNewPlayList = (item) => {
    const { openModal } = this.state;
    this.setState({openModal:!openModal});    
  }

   loadPlaylistData =  (userId) => {
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
       
         if(response){
           this.setState({
             playlists: response.data.data.user.playlists
           })
       }
     }).catch((error) => {
       console.log('error',error)
     });
    
   }

    // addSongsToPlaylist =  (songIds, playlistIds) => {
    //   getUserData({
    //     query: `mutation{
    //       addSongToPlaylist(songId: "${songIds}", playlistId:"${playlistIds}"){
    //         message
    //         success
    //       }
    //     }`
    //     }).then((response) => {
    //   }).catch((error) => {
    //     console.log('error',error)
    //   });
    
    // }

    // deleteSongsFromPlaylist =  (songIds, playlistIds) => {
    //   getUserData({
    //     query: `mutation{
    //       deleteSongFromPlaylist(songId: "${songIds}", playlistId:"${playlistIds}"){
    //         message
    //         success
    //       }
    //     }`
    //     }).then((response) => {
    //   }).catch((error) => {
    //     console.log('error',error)
    //   });
    
    // }

    addPlaylist = (playlistName) => {
      const userId = 1;
      createUserPlayList({
        query: `mutation{
          addPlaylist(title: "${playlistName}", userId:${userId}){
            message
            success
          }
        }`
        }).then((response) => {
          if(response) {
            this.loadPlaylistData(1);
          }
      }).catch((error) => {
        console.log('error',error)
      });
    }

   render() {
     const {openModal } = this.state;
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
                     {<PlaylistBreadcrumb items={['Playlist Library', 'Your Playlist']} />}
                      <div className="boxview">
                          <div className="box" onClick={() => this.createNewPlayList()}>
                            <div style={{height: '65%', width: '75%', background: '#121212', borderRadius: '18px'}}>
                              <img src={createNewImg} style={{margin:'17px'}}/>
                            </div>
                            <p className="title">{'Create New'}</p>
                          </div>
                          {(this.state.playlists || []).map((item, index) => (
                            <Group item={item} key={index} type={'moods'} />
                          ))}
                        </div>
                   </Col>
                 </Row>
               </TabPane>
             </TabContent>
           </div>
         </section>
       </div>
       <ModalCreateNew modal={openModal} toggle={this.createNewPlayList} createItem={this.addPlaylist} />
     </div>
   );

   }
 }
 export default PlayListLibraby;