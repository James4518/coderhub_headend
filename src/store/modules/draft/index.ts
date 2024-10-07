import {
  createDraft,
  updateDraft,
  removeDraft,
  getDrafts
} from '@/network/features/draft';
import { IDraft, IDraftsRes } from '@/network/features/draft/type';
import { IBasePageParams, IRes } from '@/network/features/interface';
import { IThunkState } from '@/store/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDraftInitialState } from './type';

const initialState: IDraftInitialState = {
  totalCount: 0,
  draftList: []
};
const DraftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    addDraftAction(state, { payload }) {
      state.draftList = [...state.draftList, payload];
      state.totalCount++;
    },
    updateDraftAction(state, { payload }) {
      const { id, content } = payload;
      state.draftList = state.draftList.map((draft) =>
        draft.id === id ? { ...draft, content } : draft
      );
    },
    removeDraftAction(state, { payload }) {
      state.draftList = state.draftList.filter((item) => item !== payload);
      state.totalCount--;
    },
    changeDraftListAction(state, { payload }) {
      const { drafts, totalCount } = payload;
      state.draftList = [...state.draftList, ...drafts];
      state.totalCount = totalCount;
    }
  }
});

export const fetchAddDraftAction = createAsyncThunk<
  IRes<IDraft>,
  string,
  IThunkState
>('draft/add', async (content, { dispatch }) => {
  const res = await createDraft(content);
  dispatch(addDraftAction(content));
  return res;
});
export const fetchUpdateDraftAction = createAsyncThunk<
  IRes<IDraft>,
  { id: number; content: string },
  IThunkState
>('draft/update', async ({ id, content }, { dispatch }) => {
  const res = await updateDraft(id, content);
  dispatch(addDraftAction(content));
  return res;
});
export const fetchRemoveDraftAction = createAsyncThunk<
  IRes<IDraft>,
  number,
  IThunkState
>('draft/remove', async (id, { dispatch }) => {
  const res = await removeDraft(id);
  dispatch(addDraftAction(id));
  return res;
});
export const fetchDraftListAction = createAsyncThunk<
  IRes<IDraftsRes>,
  IBasePageParams,
  IThunkState
>('draft/list', async ({ offset = 0, size = 10 }, { dispatch }) => {
  const res = await getDrafts(offset, size);
  const { totalCount, drafts } = res.data;
  dispatch(changeDraftListAction({ drafts, totalCount }));
  return res;
});
export const { addDraftAction, removeDraftAction, changeDraftListAction } =
  DraftSlice.actions;
export default DraftSlice.reducer;
