import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthModule from './auth';

const rootReducer = combineReducers({
    auth: AuthModule.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export default store;
