import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import { createLoaderModel, modelProps } from '../model';

export default function (loaderParameters) {
  return (ChildComponent) => {
    class Loader extends React.Component {
      componentDidMount = () => {
        const { loadAction, loaderState: { hasTriedLoad, isLoading }, match: { params } } = this.props;

        if (!hasTriedLoad && !isLoading) {
          loadAction(params);
        }
      }

      componentWillUnmount = () => {
        if (loaderParameters.clearOnBack) {
          const { reset } = this.props;
          reset();
        }
      }

      closeDialog = () => {
        const { reset } = this.props;
        reset();
      }

      render = () => {
        const { loaderState, loaderState: { hasTriedLoad, isLoading, showGenericError }, ...rest } = this.props;

        if (!hasTriedLoad || isLoading || showGenericError) {
          return (
            <div>
              <Spinner
                size={SpinnerSize.large}
              />
              <Dialog
                title='UH-OH, An Error Occured :('
                hidden={!showGenericError}
                onDismiss={this.closeDialog}
                modalProps={{
                  isBlocking: true,
                }}
              >
                <p>An un-recoverable error has occured and you will be re-directed after this dialog is closed.</p>

                <DialogFooter>
                  <PrimaryButton onClick={this.closeDialog}>
                    <Link to={loaderParameters.redirect || '/'}>Close</Link>
                  </PrimaryButton>
                </DialogFooter>
              </Dialog>
            </div>
          );
        }

        return <ChildComponent loaderState={loaderState} {...rest} />;
      }
    }

    Loader.propTypes = {
      reset: PropTypes.func.isRequired,
      loadAction: PropTypes.func.isRequired,
      loaderState: PropTypes.shape(modelProps),
    };

    Loader.defaultProps = {
      loaderState: createLoaderModel(),
    };

    const mapStateToProps = (state) => {
      return {
        loaderState: loaderParameters.selector(state),
      };
    };

    const mapDispatchToProps = (dispatch, props) => {
      return {
        reset: () => {
          dispatch({
            type: loaderParameters.handleLoad,
            subType: 'reset',
            isLoading: false,
            showGenericError: false,
            hasTriedLoad: false,
          });
        },
        loadAction: (params) => {
          dispatch({
            type: loaderParameters.handleLoad,
            subType: 'load',
            isLoading: true,
            showGenericError: false,
            data: null,
          });
          dispatch((dispatch2) => {
            Promise.resolve(loaderParameters.loadAction(params))
              .then((result) => {
                dispatch2({
                  type: loaderParameters.handleLoad,
                  subType: 'done',
                  isLoading: false,
                  showGenericError: false,
                  data: result,
                });
              })
              .catch((exception) => {
                if (loaderParameters.loadFailed) {
                  dispatch2({
                    type: loaderParameters.handleLoad,
                    subType: 'failed',
                    isLoading: true,
                    showGenericError: true,
                    data: null,
                  });
                  dispatch2({
                    type: loaderParameters.loadFailed,
                    subType: 'failed',
                    exception,
                  });
                }
                else {
                  dispatch2({
                    type: loaderParameters.handleLoad,
                    subType: 'failed',
                    isLoading: true,
                    showGenericError: true,
                    data: null,
                  });
                }
              });
          });
        },
      };
    };

    return connect(mapStateToProps, mapDispatchToProps)(Loader);
  };
}
