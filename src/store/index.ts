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
import reviewReducer from './modules/review';
import draftReducer from './modules/draft';
import { checkDataMiddleware } from './middlewares';
import { DispatchType, IRootState } from './type';

const store = configureStore({
  reducer: {
    user: userReducer,
    moment: momentReducer,
    praise: praiseReducer,
    label: labelReducer,
    data: dataReducer,
    review: reviewReducer,
    draft: draftReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      checkDataMiddleware([
        { type: 'data/days/fulfilled', stateKey: 'data' },
        { type: 'data/overview/fulfilled', stateKey: 'data' }
      ])
    )
});

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppShallowEqual = shallowEqual;
export default store;
