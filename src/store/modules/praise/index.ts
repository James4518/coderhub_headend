import { IRes } from '@/network/features/interface';
import { praise } from '@/network/features/praise';
import { IPraise } from '@/network/features/praise/type';
import { IThunkState } from '@/store/type';
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const PraiseSlice = createSlice({
  name: 'moment',
  initialState: {
    followers: [],
    followees: [],
    likes: [],
    collects: []
  },
  reducers: {
    changeFollowersAction(state, { payload }) {
      state.followers = payload;
    },
    changeFolloweesAction(state, { payload }) {
      state.followees = payload;
    },
    changeLikesAction(state, { payload }) {
      state.likes = payload;
    },
    changeCollectAction(state, { payload }) {
      state.collects = payload;
    }
  }
});

export const fetchPraiseAction: AsyncThunk<
  IRes<string>,
  { action: IPraise; targetId: number },
  IThunkState
> = createAsyncThunk<
  IRes<string>,
  { action: IPraise; targetId: number },
  IThunkState
>('moment', async ({ action, targetId }, { dispatch }) => {
  const res = await praise(action, targetId);
  switch (action) {
    case IPraise.Follow:
      dispatch(changeFollowersAction(targetId));
      break;
    case IPraise.likeMoment:
      dispatch(changeLikesAction(targetId));
      break;
    case IPraise.Collect:
      dispatch(changeCollectAction(targetId));
      break;
  }
  return res;
});
export const {
  changeFollowersAction,
  changeFolloweesAction,
  changeLikesAction,
  changeCollectAction
} = PraiseSlice.actions;
export default PraiseSlice.reducer;
