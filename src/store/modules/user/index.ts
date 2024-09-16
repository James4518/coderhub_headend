import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin } from '@/network/features/auth';
import { IThunkState } from '@/store/type';
import storageHelper from '@/utils/cache';
import { ILoginDetail } from '@/views/login/interface';
import { IMomentListRes } from '@/network/features/moment/type';
import { IPageParamsWithId, IRes } from '@/network/features/interface';
import { ILoginRes } from '@/network/features/auth/type';
import { AxiosError } from 'axios';
import { getUserMoments } from '@/network/features/moment';
import { IInitialState } from './type';
import { ILevel, IUser } from '@/network/features/user/type';
import { getUserInfo } from '@/network/features/user';

const initialState: IInitialState = {
  username:
    storageHelper.getItem('USERNAME', 'local') ||
    storageHelper.getItem('USERNAME', 'session') ||
    '',
  avatarUrl: '',
  point: 0,
  level: ILevel.Beginner,
  moments: [],
  createAt: null,
  updateAt: null
};
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeNameAction(state, { payload }) {
      state.username = payload;
    },
    changeMomentsAction(state, { payload }) {
      state.moments.push(payload);
    },
    changePointAction(state, { payload }) {
      state.point += payload;
    },
    changeLevelAction(state, { payload }) {
      state.level = payload;
    },
    changeUserInfo(state, { payload }) {
      const { username, avatarUrl, point, level, createAt, updateAt } = payload;
      state.username = username;
      state.avatarUrl = avatarUrl;
      state.point = point;
      state.level = level;
      state.createAt = createAt;
      state.updateAt = updateAt;
    }
  }
});

export const signinAction: AsyncThunk<
  IRes<ILoginRes>,
  ILoginDetail,
  IThunkState
> = createAsyncThunk<IRes<ILoginRes>, ILoginDetail, IThunkState>(
  'user/signin',
  async ({ username, password, storageType }, { dispatch }) => {
    try {
      const res: IRes<ILoginRes> = await signin({ username, password });
      storageHelper.setItem('USERNAME', username, storageType);
      storageHelper.setItem('USERID', res.data.userId, storageType);
      dispatch(changeNameAction(username));
      return res;
    } catch (err) {
      if (err instanceof AxiosError) err.message = err.response!.data.message;
      throw err;
    }
  }
);
export const fetchUserDataAction: AsyncThunk<
  IRes<IUser>,
  number,
  IThunkState
> = createAsyncThunk<IRes<IUser>, number, IThunkState>(
  'user/info',
  async (userId, { dispatch }) => {
    const res = await getUserInfo(userId);
    dispatch(changeUserInfo(res.data));
    return res;
  }
);
export const fetchUserMoment: AsyncThunk<
  IRes<IMomentListRes>,
  IPageParamsWithId,
  IThunkState
> = createAsyncThunk<IRes<IMomentListRes>, IPageParamsWithId, IThunkState>(
  'user/userMoment',
  async ({ id, offset = 0, size = 10 }, { dispatch }) => {
    const res: IRes<IMomentListRes> = await getUserMoments(id, offset, size);
    dispatch(changeMomentsAction(res.data.moments));
    return res;
  }
);
export const { changeNameAction, changeMomentsAction, changeUserInfo } =
  UserSlice.actions;
export default UserSlice.reducer;
