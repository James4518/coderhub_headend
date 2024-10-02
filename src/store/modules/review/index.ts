import { IRes } from '@/network/features/interface';
import {
  getMomentStatus,
  getMomentStatusCount
} from '@/network/features/review';
import {
  IMomentReview,
  MomentReviewStatus
} from '@/network/features/review/type';
import { IThunkState } from '@/store/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IReviewActPayload,
  IReviewCountActPayload,
  IReviewInitialState
} from './type';

const initialState: IReviewInitialState = {
  count: {
    totalCount: 0,
    peddingCount: 0,
    approvedCount: 0,
    rejectedCount: 0
  },
  total: [],
  approved: [],
  pedding: [],
  reject: []
};
const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    changeReviewCountAction(state, { payload }: IReviewCountActPayload) {
      state.count = payload;
    },
    changeReviewAction(state, { payload }: IReviewActPayload) {
      const { status, res } = payload;
      state[status] = [...state[status], ...res];
    }
  }
});

export const fetchReviewCountAction = createAsyncThunk(
  'review/count',
  async (_, { dispatch }) => {
    const res = await getMomentStatusCount();
    dispatch(changeReviewCountAction(res.data));
    return res;
  }
);
export const fetchReviewAction = createAsyncThunk<
  IRes<IMomentReview[]>,
  MomentReviewStatus,
  IThunkState
>('review/count', async (status, { dispatch }) => {
  const res = await getMomentStatus(status);
  dispatch(changeReviewAction({ status, res: res.data }));
  return res;
});
export const { changeReviewCountAction, changeReviewAction } =
  reviewSlice.actions;
export default reviewSlice.reducer;
