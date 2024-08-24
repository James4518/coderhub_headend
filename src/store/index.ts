import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual
} from 'react-redux';
import homeReducer from './modules/home';
import userReducer from './modules/user';
import momentReducer from './modules/moment';
import labelReducer from './modules/label';
import { DispatchType, IRootState } from './type';

const store = configureStore({
  reducer: {
    home: homeReducer,
    user: userReducer,
    moment: momentReducer,
  }
});

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppShallowEqual = shallowEqual;
export default store;
