import { IRes } from '@/network/features/interface';
import { getPraiseInfo, praise } from '@/network/features/praise';
import { IPraise, IPraiseInfo } from '@/network/features/praise/type';
import { IThunkState } from '@/store/type';
import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { IPraiseInitialState } from './type';

const initialState: IPraiseInitialState = {
  followers: [],
  followees: [],
  likes: [],
  collects: []
};
export const PraiseSlice = createSlice({
  name: 'moment',
  initialState,
  reducers: {
    initAction(state, { payload }) {
      const { followers, followees, likes, collects } = payload;
      state.followers = followers;
      state.followees = followees;
      state.likes = likes;
      state.collects = collects;
    },
    changeFollowersAction(state, { payload }: PayloadAction<number>) {
      const isExist = state.followers.includes(payload);
      state.followers = isExist
        ? state.followers.filter((follower) => follower !== payload)
        : [...state.followers, payload];
    },
    changeFolloweesAction(state, { payload }: PayloadAction<number>) {
      const isExist = state.followees.includes(payload);
      state.followees = isExist
        ? state.followees.filter((followee) => followee !== payload)
        : [...state.followees, payload];
    },
    changeLikesAction(state, { payload }: PayloadAction<number>) {
      const isExist = state.likes.includes(payload);
      state.likes = isExist
        ? state.likes.filter((like) => like !== payload)
        : [...state.likes, payload];
    },
    changeCollectsAction(state, { payload }: PayloadAction<number>) {
      const isExist = state.collects.includes(payload);
      state.collects = isExist
        ? state.collects.filter((collect) => collect !== payload)
        : [...state.collects, payload];
    }
  }
});

export const fetchPraiseAction = createAsyncThunk<
  IRes<IPraiseInfo>,
  undefined,
  IThunkState
>('praise', async (_, { dispatch }) => {
  const res = await getPraiseInfo();
  dispatch(initAction(res.data));
  return res;
});
export const updatePraiseAction: AsyncThunk<
  IRes<string>,
  { action: IPraise; targetId: number },
  IThunkState
> = createAsyncThunk<
  IRes<string>,
  { action: IPraise; targetId: number },
  IThunkState
>('praise', async ({ action, targetId }, { dispatch }) => {
  const res = await praise(action, targetId);
  switch (action) {
    case IPraise.Follow:
      dispatch(changeFollowersAction(targetId));
      break;
    case IPraise.likeMoment:
      dispatch(changeLikesAction(targetId));
      break;
    case IPraise.Collect:
      dispatch(changeCollectsAction(targetId));
      break;
  }
  return res;
});
export const {
  initAction,
  changeFollowersAction,
  changeFolloweesAction,
  changeLikesAction,
  changeCollectsAction
} = PraiseSlice.actions;
export default PraiseSlice.reducer;
