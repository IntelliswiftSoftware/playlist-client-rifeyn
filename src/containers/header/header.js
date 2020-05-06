import React from 'react';
import './header.scss';

className Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className='headerbar'>
        <header className="justify-content-between fixed-top">
          <div className="logo-box col-8">
            <a className="navbar-brand" href="#">
              <img src="http://placehold.it/150x50?text=Logo" alt="" />
            </a>
              <div className="dropdown">
                {/* <!--Trigger--> */}
              <a type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false"><i className="fas fa-ellipsis-v"></i></a>
                {/* <!--Menu--> */}
              <div className="dropdown-menu dropdown-primary">
                  <a className="dropdown-item" href="#">Add To Playlist</a>
                  <a className="dropdown-item" href="#">Remove from Playlist</a>
                </div>
              </div>
              <div className="col-6" id="custom-search-input">
                <div className="input-group col-md-12">
                  <input type="text" className="  search-query form-control" placeholder="Search" />
                  <span className="input-group-btn">
                    <button className="btn btn-danger" type="button">
                      <span className=" glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="profile">
              <div>Hello Adam</div>
              <div className="dropdown dropleft">
                {/* <!--Trigger--> */}
              <a type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false"><i className="fas fa-caret-down"></i></a>
                {/* <!--Menu--> */}
              <div className="dropdown-menu dropdown-primary">
                  <a className="dropdown-item" href="#">Change Password</a>
                  <a className="dropdown-item" href="#">Settings</a>
                </div>
              </div>
              <div className="profile-thumb">
                <img src="images/profile.jpg" />
              </div>
            </div>
  </header>
  </div>
    )
  }
}
export default Header;