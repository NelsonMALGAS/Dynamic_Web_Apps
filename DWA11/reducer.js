
// Reducer functions should only depend on their state and action arguments,
/**
 * Reduces the state based on the action.
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
  