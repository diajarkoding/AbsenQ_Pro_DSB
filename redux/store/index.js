import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//
// const store = createStoreWithMiddleware(reducer);

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
