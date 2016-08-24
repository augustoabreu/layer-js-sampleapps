import {
  CLIENT_READY,
  USERS_SET
} from '../actions/messenger';

const initialState = {
  ready: false,
  clientReady: false,
  owner: '',
  users: [],
};

export default function appReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case CLIENT_READY:
      return {
        ...state,
        ready: true,
        clientReady: true
      };
    case USERS_SET:
      return {
        ...state,
        owner: payload.owner,
        users: payload.users,
      };
    default:
      return state;
  }
}
