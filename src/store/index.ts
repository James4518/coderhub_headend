import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual
} from 'react-redux';
import homeReducer from './modules/home';

const store = configureStore({
  reducer: {
    home: homeReducer
  }
});

type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppShallowEqual = shallowEqual;
export default store;
