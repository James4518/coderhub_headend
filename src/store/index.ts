import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual
} from 'react-redux';
import userReducer from './modules/user';
import momentReducer from './modules/moment';
import praiseReducer from './modules/praise';
import { DispatchType, IRootState } from './type';

const store = configureStore({
  reducer: {
    user: userReducer,
    moment: momentReducer,
    praise: praiseReducer
  }
});

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppShallowEqual = shallowEqual;
export default store;
