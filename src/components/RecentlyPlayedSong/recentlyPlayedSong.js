
import React from "react";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import PlaylistBreadcrumb from '../../containers/breadcrumb';
import { getUserLikedPlayList } from '../../constants/commonFunctions';
import SongList from '../songList';

class RecentlyPlayedSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPlayedSonglists: [],
    }
  }

  componentDidMount() {
    const {userId} = this.props;
    this.loadPlaylistData(userId);
  }

  loadPlaylistData = (userId) => {
    getUserLikedPlayList({
      query: `query {  
        user(id:${userId}) { 
          id
          recentsongs{
            id
            isLiked
            duration
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
      }`
    }).then((response) => {

      if (response) {
        this.setState({
          userPlayedSonglists: response.data.data.user.recentsongs
        })
      }
    }).catch((error) => {
      console.log('error', error)
    });

  }

  render() {
    const { userPlayedSonglists } = this.state;
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
                    Your Played Song
                     </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={'1'}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      {<PlaylistBreadcrumb items={['SongList Library', 'Recently Played Song']} />}
                      {<SongList list={userPlayedSonglists} />}
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
export default RecentlyPlayedSong;