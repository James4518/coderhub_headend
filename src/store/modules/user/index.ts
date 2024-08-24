import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin } from '@/network/features/auth';
import { IThunkState } from '@/store/type';
import storageHelper from '@/utils/cache';
import { ILoginField } from '@/views/login/interface';
import { IMomentRes } from '@/network/features/moment/type';
import { IPageParamsWithId, IRes } from '@/network/features/interface';
import { ILoginRes } from '@/network/features/auth/type';
import { AxiosError } from 'axios';
import { getUserMoments } from '@/network/features/moment';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    name:
      storageHelper.getItem('USERNAME', 'local') ||
      storageHelper.getItem('USERNAME', 'session') ||
      '',
    moments: [] as IMomentRes[],
    point: 0,
    level: ''
  },
  reducers: {
    changeNameAction(state, { payload }) {
      state.name = payload;
    },
    changeMomentsAction(state, { payload }) {
      state.moments.push(payload);
    },
    changePointAction(state, { payload }) {
      state.point += payload;
    },
    changeLevelAction(state, { payload }) {
      state.level = payload;
    }
  }
});

export const fetchUserDataAction: AsyncThunk<
  IRes<ILoginRes>,
  ILoginField,
  IThunkState
> = createAsyncThunk<IRes<ILoginRes>, ILoginField, IThunkState>(
  'userinfo',
  async ({ username, password, remember }, { dispatch }) => {
    const storageType = remember ? 'local' : 'session';
    try {
      const res: IRes<ILoginRes> = await signin({ username, password });
      storageHelper.setItem('USERNAME', username, storageType);
      dispatch(changeNameAction(username));
      return res;
    } catch (err) {
      if (err instanceof AxiosError) err.message = err.response!.data.message;
      throw err;
    }
  }
);
export const fetchUserMoment: AsyncThunk<
  IRes<IMomentRes[]>, 
  IPageParamsWithId,
  IThunkState
> = createAsyncThunk<IRes<IMomentRes[]>, IPageParamsWithId, IThunkState>(
  'userMoment', 
  async ({id, offset = 0, size = 10}, { dispatch })=> {
    const res = await getUserMoments(id, offset, size);
    dispatch(changeMomentsAction(res.data));
    return res;
  }
)
export default UserSlice.reducer;
export const { changeNameAction, changeMomentsAction } = UserSlice.actions;
