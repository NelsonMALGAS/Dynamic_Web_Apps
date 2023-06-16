/**
 * Store module responsible for managing the application state.
 */

/**
 * Creates a Redux-inspired store.
 * @param {function} reducer - The reducer function.
 * @param {Object} initialState - The initial state of the store.
 * @returns {Object} The store object with methods.
 */
export const createStore = (reducer, initialState = 0) => {
    let state = initialState;
    const subscriptions = [];
  
    /**
     * Get the current state.
     * @returns {Object} The current state.
     */
    const getState = () => state;
  
    /**
     * Dispatches an action to update the state.
     * @param {Object} action - The action object.
     */
    const dispatch = (action) => {
      state = reducer(state, action);
      subscriptions.forEach((subscription) => subscription(state));
    };
  
    /**
     * Subscribes to store changes.
     * @param {function} subscription - The callback function to be called on state changes.
     */
    const subscribe = (subscription) => {
      subscriptions.push(subscription);
    };
  
    return { getState, dispatch, subscribe };
  };
  