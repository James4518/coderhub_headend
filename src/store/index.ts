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
import labelReducer from './modules/label';
import dataReducer from './modules/data';
import { DispatchType, IRootState } from './type';

const store = configureStore({
  reducer: {
    user: userReducer,
    moment: momentReducer,
    praise: praiseReducer,
    label: labelReducer,
    data: dataReducer
  }
});

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppShallowEqual = shallowEqual;
export default store;
