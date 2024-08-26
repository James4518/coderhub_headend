import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMoment, IMomentListRes } from '@/network/features/moment/type';
import { getMomentList } from '@/network/features/moment';
import { IBasePageParams, IRes } from '@/network/features/interface';
import { IThunkState } from '@/store/type';

export const MomentSlice = createSlice({
  name: 'moment',
  initialState: {
    totalCount: 0,
    momentList: [] as IMoment[]
  },
  reducers: {
    changeTotalCountAction(state, { payload }) {
      state.totalCount = payload;
    },
    changeMomentListAction(state, { payload }) {
      state.momentList.push(...payload);
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
    console.log(offset, size);
    const state = getState();
    const res = await getMomentList(offset, size);
    dispatch(changeMomentListAction(res.data.moments));
    if (res.data.totalCount !== state.moment.totalCount) {
      dispatch(changeTotalCountAction(res.data.totalCount));
    }
    return res;
  }
);
export const { changeTotalCountAction, changeMomentListAction } =
  MomentSlice.actions;
export default MomentSlice.reducer;
