/**
 * Created by saurav on 7/8/16.
 */
const IS_MOBILE = 'app/IS_MOBILE';


const initialState = {};

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case IS_MOBILE:
      return {
        ...state,
        mobile: action.mobile
      };
    default:
      return state;
  }
}
