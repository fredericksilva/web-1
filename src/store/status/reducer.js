import { initialState, getLoadingState, getErrorState } from './selectors'

export default (state = initialState, action) => {
  if (!action.type) return state

  // eslint-disable-next-line prefer-const
  let [suffix, ...prefix] = action.type.split('_').reverse()
  prefix = prefix.reverse().join('_')

  switch (suffix) {
    case 'REQUEST':
      return {
        loading: {
          ...getLoadingState(state),
          [prefix]: true
        },
        error: {
          ...getErrorState(state),
          [prefix]: false
        }
      }
    case 'SUCCESS':
    case 'CANCEL':
      return {
        loading: {
          ...getLoadingState(state),
          [prefix]: false
        },
        error: {
          ...getErrorState(state),
          [prefix]: false
        }
      }
    case 'FAILURE':
      return {
        loading: {
          ...getLoadingState(state),
          [prefix]: false
        },
        error: {
          ...getErrorState(state),
          [prefix]: true
        }
      }
    default:
      return state
  }
}
