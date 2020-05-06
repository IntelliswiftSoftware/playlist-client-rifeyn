import { GetRequest, PostRequest } from '../api/apiList';
import { endpoints } from './appConfig';

export const redirectTo = (path, history) => {
  history.push(path);
};

const URL = `${endpoints.baseUrl}songPlaylist`;
const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

export const createGuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const login = (payload) => {
  const URL = `${endpoints.baseUrl}login`;
  return PostRequest(URL, header, payload);
};

export const getUserData = (data) => {  
  return PostRequest(URL, header, data);
}

export const getNewReleaseSongList = (data) => {
  return PostRequest(URL, header, data);
}
export const getTopChartSongList = (data) => {
  return PostRequest(URL, header, data);
}
export const getMoodsList = (data) => {
  return PostRequest(URL, header, data);
}
export const getArtistsList = (data) => {
  return PostRequest(URL, header, data);
}
export const getGenerList = (data) => {
  return PostRequest(URL, header, data);
}
export const getSongsByArtistsId = (data) => {
  return PostRequest(URL, header, data);
}
export const getSongsByMoodId = (data) => {
  return PostRequest(URL, header, data);
}
export const getSongsByGenreId = (data) => {
  return PostRequest(URL, header, data);
}
export const getUserPlayList = (data) => {
  return PostRequest(URL, header, data);
}
export const createUserPlayList = (data) => {
  return PostRequest(URL, header, data);
}
export const getUserLikedPlayList = (data) => {
  return PostRequest(URL, header, data);
}
export const addToPlayedSongs = (data) => {
  return PostRequest(URL, header, data);
}
export const addSongInPlaylists = (data) => {
  return PostRequest(URL, header, data);
}



