// pavyzdinis middleware gali buti naudojamas development aplinkoje

// bet ne i production iskonsologina dalykus tarpe

const log = ({ dispatch, getState }) => next => action => {
  console.log({ dispatch, getState, next, action });

  return next(action);
};

export default log;
