import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin } from '@/network/features/auth';
import { IThunkState } from '@/store/type';
import storageHelper from '@/utils/cache';
import { ILoginField } from '@/views/login/interface';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    name:
      storageHelper.getItem('USERNAME', 'local') ||
      storageHelper.getItem('USERNAME', 'session') ||
      '',
    point: 0,
    level: ''
  },
  reducers: {
    changeNameAction(state, { payload }) {
      state.name = payload;
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
  boolean,
  ILoginField,
  IThunkState
> = createAsyncThunk<boolean, ILoginField, IThunkState>(
  'userinfo',
  async ({ username, password, remember }, { dispatch }) => {
    const storageType = remember ? 'local' : 'session';
    try {
      await signin({ username, password });
      storageHelper.setItem('USERNAME', username, storageType);
      dispatch(changeNameAction(username));
      return true;
    } catch (err) {
      return false;
    }
  }
);

export default UserSlice.reducer;
export const { changeNameAction } = UserSlice.actions;
