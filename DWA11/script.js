

import { createStore } from './store.js';
import { reducer } from './reducer.js';
import { incrementAction, decrementAction, resetAction } from './actions.js';
import { logState } from './subscription.js';

// Create store instance
const store = createStore(reducer, { count: 0 });

// Subscribe to store changes
store.subscribe(logState);

// Dispatch actions
store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(decrementAction);
store.dispatch(resetAction)

