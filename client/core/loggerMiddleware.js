export default (store) => (next) => (action) => {
  if (action.type && process.env.NODE_ENV === 'development') {
    console.log(`%c{ ACTION: ${action.type}${action.subType ? ` SUB: ${action.subType}` : ''} }`, 'color:blue');
  }

  return next(action);
};
