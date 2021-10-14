import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

// function configureStore(preloadedState: any) {
//   const composeEnhancers =
//     (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   const store = createStore(
//     reducers,
//     preloadedState,
//     composeEnhancers(applyMiddleware(...middlewares)),
//   );

//   sagaMiddleware.run(rootSaga);

//   if ((module as any).hot) {
//     (module as any).hot.accept('../reducers/index', () => {
//       const nextRootReducer = require('../reducers/index');
//       store.replaceReducer(nextRootReducer);
//     });
//   }

//   return store;
// }
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
