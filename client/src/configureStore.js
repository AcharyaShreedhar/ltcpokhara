
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState, rootReducer, history) {
  const store = createStore(
    rootReducer, // root reducer with router state
    initialState,
    compose(applyMiddleware(sagaMiddleware))
  )

  sagaMiddleware.run(rootSaga)

  return store
}
