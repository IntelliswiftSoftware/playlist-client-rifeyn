import React from "react";
import { connect } from 'react-redux';

import './footer.scss';
import crop from '../../images/crop.jpg';
import icShare from '../../images/ic_share_24px@2x-01.svg';
import group from '../../images/Group 107@2x-01.svg';
import icShuffle from '../../images/ic_shuffle_24px@2x-01.svg';
import icRepeat from '../../images/ic_repeat_24px@2x-01.svg';
import icVolumeOff from '../../images/ic_volume_off_24px@2x.svg';
import icVolumeDown from '../../images/ic_volume_down_24px@2x.svg';
import icVolumeUp from '../../images/ic_volume_up_24px@2x-01.svg';
import icSkipNext1 from '../../images/ic_skip_next_-1@2x.svg';
import icPlayCircleOutLine from '../../images/ic_play_circle_outline_24px@2x-01.svg';
import icSkipNext24 from '../../images/ic_skip_next_24px@2x.svg';



const Footer = (props) => {

  const { playedSong } = props;
  return (
    <div className="playerbox">
      <div className="progressholder mobileonly">
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
            aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width: '45%'}} ></div>
        </div>
      </div>
      <div className="mediainfo col-3">
        <div className="list no-gutters">
          <div className="thumbnail"><img src={playedSong.image ? playedSong.image.basepath+playedSong.image.high : crop} /></div>
          <div className="title col-6">
            <h3>{playedSong.title}<span>{playedSong.artist ? playedSong.artist.firstname: ''}</span></h3>
          </div>
          <div className="actions col-3">
            <div className="fav active"><i className="fas fa-heart"></i></div>
            <div className="share"><img src={icShare} /></div>
            <div className="group"><img src={group} /></div>
          </div>
        </div>
      </div>
      <div className="player col-6">
        <div className="playbuttons no-gutters">
          <div className=" currenttime">{'00.00'}</div>
          <div className="playpause">
            <a><img src={icSkipNext1} /></a>
            <a><img src={icPlayCircleOutLine} /></a>
            <a><img src={icSkipNext24} /></a>
          </div>
        <div className="endtime">{playedSong.duration || '00.00'}</div>
        </div>
        <div className="desktoponly">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
              aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}></div>
          </div>
        </div>
      </div>
      <div className="controls col-3">
        <ul className="controls-list">
          <li><a><img src={icShuffle} /></a></li>
          <li><a><img src={icRepeat} /></a></li>
          <li className="volume-off"><a><img src={icVolumeOff} /></a></li>
          <li className="volume-down"><a><img src={icVolumeDown} /></a></li>
          <li className="volume-level"><a> <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
              aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width: '45%'}}></div>
          </div></a></li>
          <li className="volume-up"><a><img src={icVolumeUp} /></a></li>
        </ul>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  playedSong: state.utilsReducer.playedSong,
})
export default connect(mapStateToProps)(Footer);