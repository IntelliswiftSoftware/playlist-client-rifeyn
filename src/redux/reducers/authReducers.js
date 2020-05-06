let loggedInData = {
  loggedIn: false,
};

const authReducers = (
  state = {
    login: loggedInData,
  },
  action,
) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'ACTION_LOGIN':
      newState.login = action.payload.data;
      return { ...newState };
    case 'ACTION_LOGOUT':
      newState.login = {
        loggedIn: false,
      };
      return { ...newState };
    default:
      return state;
  }
};
export default authReducers;
