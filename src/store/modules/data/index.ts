import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRes } from '@/network/features/interface';
import { IThunkState } from '@/store/type';
import { getDataInfo, overview } from '@/network/features/data';
import { IDailyOverviewRes, IDailyRes } from '@/network/features/data/type';
import { groupValuesByKey } from '@/utils/common';
import { IDays, IDaysData, IinitialState } from './type';
import { getDatesBetween, getYesterdayAndAgo } from '@/utils/date';

const initialState: IinitialState = {
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
  preMomentsCount: 0,
  '7days': {
    dates: [],
    series: {
      fansCount: [],
      newFansCount: [],
      unfollowCount: [],
      netfollowCount: [],
      viewCount: [],
      likeCount: [],
      commentCount: [],
      collectCount: [],
      publishCount: []
    }
  },
  '14days': {
    dates: [],
    series: {
      fansCount: [],
      newFansCount: [],
      unfollowCount: [],
      netfollowCount: [],
      viewCount: [],
      likeCount: [],
      commentCount: [],
      collectCount: [],
      publishCount: []
    }
  },
  '30days': {
    dates: [],
    series: {
      fansCount: [],
      newFansCount: [],
      unfollowCount: [],
      netfollowCount: [],
      viewCount: [],
      likeCount: [],
      commentCount: [],
      collectCount: [],
      publishCount: []
    }
  }
};
export const DataSlice = createSlice({
  name: 'data',
  initialState,
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
    },
    changeDaysAction(state, { payload }: { payload: IDaysData }) {
      const {
        days,
        dates,
        fansCount,
        newFansCount,
        unfollowCount,
        netfollowCount,
        viewCount,
        likeCount,
        commentCount,
        collectCount,
        publishCount
      } = payload;
      if (state[days]) {
        state[days].dates = dates;
        state[days].series.fansCount = fansCount;
        state[days].series.newFansCount = newFansCount;
        state[days].series.unfollowCount = unfollowCount;
        state[days].series.netfollowCount = netfollowCount;
        state[days].series.viewCount = viewCount;
        state[days].series.likeCount = likeCount;
        state[days].series.commentCount = commentCount;
        state[days].series.collectCount = collectCount;
        state[days].series.publishCount = publishCount;
      }
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
export const fetchDaysAction = createAsyncThunk<
  IRes<IDailyRes[]>,
  IDays,
  IThunkState
>('data/days', async (days, { dispatch }) => {
  const day = parseInt(days.match(/\d+/)?.[0] ?? '7');
  const res: IRes<IDailyRes[]> = await getDataInfo(day);
  const data = groupValuesByKey<IDailyRes>(res.data);
  const date = getYesterdayAndAgo(day);
  const dates = getDatesBetween(date.target.date, date.yesterday.date);
  dispatch(changeDaysAction({ days, dates, ...data }));
  return res;
});
export const { changeDataInfoAction, changeDaysAction } = DataSlice.actions;
export default DataSlice.reducer;
