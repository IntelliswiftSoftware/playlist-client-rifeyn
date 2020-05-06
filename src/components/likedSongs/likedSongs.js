
 import React from "react";
 import classnames from 'classnames';
 import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

 import PlaylistBreadcrumb from '../../containers/breadcrumb';
 import { getUserLikedPlayList } from '../../constants/commonFunctions';
 import SongList from '../songList';

 class LikedSongs extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
        userLikedSonglists: [],
     }
   }


   componentDidMount () {
     const {userId} = this.props;
     this.loadPlaylistData(userId);
   }

   loadPlaylistData =  (userId) => {
    getUserLikedPlayList({
       query: `query {  
        user(id:${userId}) { 
          id
          likedsongs{
                    id
            duration
            isLiked
            source
            title
            artist{
              firstname
              lastname
              id
            },
            playlists{
              id
              title
            },
            image{
                low
                mid
                high
                basepath
            }
          }
        }  
      }
    `
       }).then((response) => {
       
         if(response){
           this.setState({
             userLikedSonglists: response.data.data.user.likedsongs
           })
       }
     }).catch((error) => {
       console.log('error',error)
     });
    
   }

   render() {
       const { userLikedSonglists } = this.state;
   return (
     <div className="conent-box col-lg-12">
       <h1 className="heading">Songs Library
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
                   Your Liked Song
                     </NavLink>
               </NavItem>
             </Nav>
             <TabContent activeTab={'1'}>
               <TabPane tabId="1">
                 <Row>
                   <Col sm="12">
                     {<PlaylistBreadcrumb items={['SongList Library', 'Liked Song']} />}
                     {<SongList list={userLikedSonglists} />}
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
 }
 export default LikedSongs;