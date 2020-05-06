const utilsReducers = (
  state = {
    isLoading: false,
    userDetails: {},
    playedSong: {},
    selectedGroup: {}
  },
  action,
) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'ACTION_SHOW_LOADING':
      newState.isLoading = true;
      newState.loaderStyles = action.payload;
      return newState;
    case 'ACTION_HIDE_LOADING':
      newState.isLoading = false;
      return newState;
    case 'ACTION_SET_USERDETAILS':
      newState.userDetails = action.payload.data;
      return newState;
    case 'ACTION_SET_SONG':
      newState.playedSong = action.payload.data;
      return newState;
    case 'ACTION_SET_GROUP':
      newState.selectedGroup = action.payload.data;
      return newState;
    default:
      return state;
  }
};
export default utilsReducers;
