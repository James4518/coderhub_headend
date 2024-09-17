import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRes } from '@/network/features/interface';
import { IThunkState } from '@/store/type';
import { overview } from '@/network/features/data';
import { IDailyOverviewRes } from '@/network/features/data/type';

export const DataSlice = createSlice({
  name: 'data',
  initialState: {
    fansCount: 0,
    preFansCount: 0,
    newFansCount: 0,
    preNewFansCount: 0,
    unfollowCount: 0,
    preUnfollowCount: 0,
    netFollowCount: 0,
    preNetFollowCount: 0,
    viewCount: 0,
    preViewCount: 0,
    likeCount: 0,
    preLikeCount: 0,
    commentCount: 0,
    preCommentCount: 0,
    collectCount: 0,
    preCollectCount: 0,
    momentsCount: 0,
    preMomentsCount: 0
  },
  reducers: {
    changeDataInfoAction(state, { payload }) {
      const {
        fansCount,
        preFansCount,
        newFansCount,
        preNewFansCount,
        unfollowCount,
        preUnfollowCount,
        netFollowCount,
        preNetFollowCount,
        viewCount,
        preViewCount,
        likeCount,
        preLikeCount,
        collectCount,
        preCollectCount,
        commentCount,
        preCommentCount
      } = payload;
      state.fansCount = fansCount;
      state.preFansCount = preFansCount;
      state.newFansCount = newFansCount;
      state.preNewFansCount = preNewFansCount;
      state.unfollowCount = unfollowCount;
      state.preUnfollowCount = preUnfollowCount;
      state.netFollowCount = netFollowCount;
      state.preNetFollowCount = preNetFollowCount;
      state.viewCount = viewCount;
      state.preViewCount = preViewCount;
      state.likeCount = likeCount;
      state.preLikeCount = preLikeCount;
      state.collectCount = collectCount;
      state.preCollectCount = preCollectCount;
      state.commentCount = commentCount;
      state.preCommentCount = preCommentCount;
    }
  }
});

export const fetchDataInfoAction: AsyncThunk<
  IRes<IDailyOverviewRes>,
  undefined,
  IThunkState
> = createAsyncThunk<IRes<IDailyOverviewRes>, undefined, IThunkState>(
  'data/overview',
  async (_, { dispatch }) => {
    const res = await overview();
    dispatch(changeDataInfoAction(res.data));
    return res;
  }
);
export const { changeDataInfoAction } = DataSlice.actions;
export default DataSlice.reducer;
