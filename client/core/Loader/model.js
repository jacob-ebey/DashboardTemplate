import PropTypes from 'prop-types';

export const modelProps = {
  hasTriedLoad: PropTypes.bool,
  isLoading: PropTypes.bool,
  showGenericError: PropTypes.bool,
  data: PropTypes.any,
};


export const createLoaderModel = () => {
  return {
    hasTriedLoad: false,
    isLoading: false,
    showGenericError: false,
    data: null,
  };
};

export const handleLoad = (action) => {
  return {
    hasTriedLoad: typeof action.hasTriedLoad === 'undefined' ? true : action.hasTriedLoad,
    isLoading: action.isLoading,
    showGenericError: action.showGenericError,
    data: action.data,
  };
};

export const forceLoad = (data) => {
  return {
    hasTriedLoad: true,
    isLoading: false,
    showGenericError: false,
    data,
  };
};
