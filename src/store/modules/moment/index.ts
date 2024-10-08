import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMomentListRes } from '@/network/features/moment/type';
import { getMomentList } from '@/network/features/moment';
import { IBasePageParams, IRes } from '@/network/features/interface';
import { IThunkState } from '@/store/type';
import { IMomentInitialState } from './type';

const initialState: IMomentInitialState = {
  totalCount: 0,
  momentList: []
};
export const MomentSlice = createSlice({
  name: 'moment',
  initialState,
  reducers: {
    changeTotalCountAction(state, { payload }) {
      state.totalCount = payload;
    },
    changeMomentListAction(state, { payload }) {
      state.momentList.push(...payload);
    },
    updateMomentListAction(state, { payload }) {
      state.momentList = payload;
    },
    resetMomentListAction(state) {
      state.momentList = [];
    }
  }
});

export const fetchMomentListAction: AsyncThunk<
  IRes<IMomentListRes>,
  IBasePageParams,
  IThunkState
> = createAsyncThunk<IRes<IMomentListRes>, IBasePageParams, IThunkState>(
  'moment',
  async ({ offset = 0, size = 10 }, { dispatch, getState }) => {
    const state = getState();
    const res = await getMomentList(offset, size);
    dispatch(changeMomentListAction(res.data.moments));
    if (res.data.totalCount !== state.moment.totalCount) {
      dispatch(changeTotalCountAction(res.data.totalCount));
    }
    return res;
  }
);
export const {
  changeTotalCountAction,
  changeMomentListAction,
  updateMomentListAction,
  resetMomentListAction
} = MomentSlice.actions;
export default MomentSlice.reducer;
