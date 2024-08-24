import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMomentRes } from '@/network/features/moment/type';
import { getMomentList } from '@/network/features/moment';
import { IBasePageParams, IRes } from '@/network/features/interface';
import { IThunkState } from '@/store/type';

export const MomentSlice = createSlice({
  name: 'moment',
  initialState: {
    momentList: [] as IMomentRes[]
  },
  reducers: {
    changeMomentList(state, { payload }) {
      state.momentList.push(payload);
    }
  }
});

export const fetchMomentListAction: AsyncThunk<
  IRes<IMomentRes[]>,
  IBasePageParams,
  IThunkState
> = createAsyncThunk<IRes<IMomentRes[]>, IBasePageParams, IThunkState>(
  'moment',
  async ({ offset = 0, size = 10 }, { dispatch }) => {
    const res = await getMomentList(offset, size);
    dispatch(changeMomentList(res.data));
    return res;
  }
);
export const { changeMomentList } = MomentSlice.actions;
export default MomentSlice.reducer;
