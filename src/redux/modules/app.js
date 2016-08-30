/**
 * Created by saurav on 7/8/16.
 */
const IS_MOBILE = 'app/IS_MOBILE';
const NOT_FOUND = 'app/NOT_FOUND';


const initialState = {
  status: 200,
  defaultStation: 'NDLS New Delhi',
  nav: [
    {
      url: '/in/trains/',
      title: ''
    },
    {
      url: '/in/trains/pnr-status',
      title: ''
    },
    {
      url: '/in/trains/running-status-route',
      title: ''
    },
    {
      url: '/in/trains/cancelled',
      title: ''
    },
    {
      url: '/in/trains/station',
      title: ''
    },
  ]
};

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
