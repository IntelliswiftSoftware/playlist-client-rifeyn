
import React, {useState} from "react";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import PlaylistBreadcrumb from '../../containers/breadcrumb';
import { getUserLikedPlayList } from '../../constants/commonFunctions';
import SongList from '../songList';

const SearchResult = (props) => {

    return (
      <div className="conent-box col-lg-12">
        <h1 className="heading">Search Songs</h1>

        <div className="tab-view">
          <section>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: true })}
                  >
                    Result
                     </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={'1'}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      {/* {<PlaylistBreadcrumb items={['SongList Library', 'Recently Played Song']} />} */}
                      <SongList list={props.list} />
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

export default SearchResult;