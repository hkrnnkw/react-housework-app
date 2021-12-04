import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export default store;
