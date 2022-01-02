import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthModule from './auth';
import HousesModule from './houses';

const rootReducer = combineReducers({
  auth: AuthModule.reducer,
  houses: HousesModule.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export default store;
