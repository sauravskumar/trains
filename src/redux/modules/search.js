/**
 * Created by saurav on 8/7/16.
 */
const LOAD = 'search/LOAD';
const LOAD2 = 'search/LOAD2';
const LOAD_SUCCESS = 'search/LOAD_SUCCESS';
const TRAIN_BETWEEN_LOAD_SUCCESS = 'search/TRAIN_BETWEEN_LOAD_SUCCESS';
const TRAIN_INFO_LOAD_SUCCESS = 'search/TRAIN_INFO_LOAD_SUCCESS';
const STATION_INFO_LOAD_SUCCESS = 'search/STATION_INFO_LOAD_SUCCESS';
const TRAIN_SEARCH_LOAD_SUCCESS = 'search/TRAIN_SEARCH_LOAD_SUCCESS';
const STATION_SEARCH_LOAD_SUCCESS = 'search/STATION_SEARCH_LOAD_SUCCESS';
const PNR_LOAD_SUCCESS = 'search/PNR_LOAD_SUCCESS';
const LOAD_FAIL = 'search/LOAD_FAIL';

const initialState = {
  loaded: false,
  trainList: [],
  stationList: []
};

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD2:
      return {
        ...state,
        loading2: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case TRAIN_BETWEEN_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        trainBetweenList: action.result
      };
    case TRAIN_INFO_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        trainInfo: action.result
      };
    case STATION_INFO_LOAD_SUCCESS:
      // console.log(STATION_INFO_LOAD_SUCCESS);
      return {
        ...state,
        loading: false,
        loaded: true,
        stationInfo: action.result
      };
    case TRAIN_SEARCH_LOAD_SUCCESS:
      // console.log(TRAIN_SEARCH_LOAD_SUCCESS);
      // console.log(action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        trainList: action.result
      };
    case STATION_SEARCH_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        stationList: action.result
      };
    case PNR_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        pnr: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

// export function isLoaded(globalState) {
//   return globalState.info && globalState.info.loaded;
// }

export function trainComp(param) {
  return {
    types: [LOAD2, TRAIN_SEARCH_LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/train-complete?q=' + param)
  };
}

export function stationComp(param) {
  return {
    types: [LOAD2, STATION_SEARCH_LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/station-complete?q=' + param)
  };
}

export function loadTrainsBetween(source, dest) {
  return {
    types: [LOAD, TRAIN_BETWEEN_LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/trains-between?source=' + source + '&dest=' + dest)
  };
}

export function loadTrainInfo(code) {
  return {
    types: [LOAD, TRAIN_INFO_LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/train-info?code=' + code)
  };
}

export function loadStationInfo(code) {
  return {
    types: [LOAD, STATION_INFO_LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/station-info?code=' + code)
  };
}

export function loadPnr(code) {
  console.log(code);
  return {
    types: [LOAD, PNR_LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/pnr?code=' + code)
  };
}
