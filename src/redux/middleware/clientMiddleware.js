import { showLoading, hideLoading } from 'react-redux-loading-bar';
export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const {promise, types, ...rest} = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      //
      dispatch(showLoading());

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          next({...rest, result, type: SUCCESS});
          dispatch(hideLoading());
        },
        (error) => {
          next({...rest, error, type: FAILURE});
          dispatch(hideLoading());
        }
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
        dispatch(hideLoading());
      });

      return actionPromise;
    };
  };
}
