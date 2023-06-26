

/**
 * This is a function that specifies how the state should be updated in response to actions
 * @param {Object} state - The current state.
 * @param {Object} action - The action object.
 * @returns {Object} The updated state.
 */
export const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        return state;
    }
  };
  