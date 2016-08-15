/**
 * Created by saurav on 7/8/16.
 */
const IS_MOBILE = 'app/IS_MOBILE';
const NOT_FOUND = 'app/NOT_FOUND';


const initialState = {status: 200};

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case IS_MOBILE:
      return {
        ...state,
        mobile: action.mobile
      };
    case NOT_FOUND:
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
}

export function onPageSetStatus(status) {
  return {
    type: NOT_FOUND,
    status
  };
}
