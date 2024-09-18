import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLabelMoments, getLabels } from '@/network/features/label';
import { IBasePageParams, IRes } from '@/network/features/interface';
import { IThunkState } from '@/store/type';
import { ILabelnitialState } from './type';
import { ILabel } from '@/network/features/label/type';
import { IMomentListRes } from '@/network/features/moment/type';

const initialState: ILabelnitialState = {
  labels: [],
  labelMoments: {}
};
export const LabelSlice = createSlice({
  name: 'moment',
  initialState,
  reducers: {
    changeLabelsAction(state, { payload }) {
      state.labels = payload;
    },
    changeLabelMomentsAction(state, { payload }) {
      const { labelId, moments } = payload;
      const { moments: newMoments, totalCount } = moments;
      if (!state.labelMoments[labelId]) {
        state.labelMoments[labelId] = { moments: [], totalCount: 0 };
      }
      state.labelMoments[labelId].moments = [
        ...state.labelMoments[labelId].moments,
        ...newMoments
      ];
      state.labelMoments[labelId].totalCount = totalCount;
    }
  }
});

export const fetchLabelsAction = createAsyncThunk<
  IRes<ILabel[]>,
  IBasePageParams,
  IThunkState
>('label/labels', async ({ offset = 0, size = 10 }, { dispatch }) => {
  const res = await getLabels(offset, size);
  dispatch(changeLabelsAction(res.data));
  return res;
});
export const fetchLabelMomentsAction = createAsyncThunk<
  IRes<IMomentListRes>,
  string,
  IThunkState
>('label/labelMoments', async (labelName, { getState, dispatch }) => {
  const state = getState();
  const label = state.label.labels.find((label) => label.name === labelName)!;
  const res = await getLabelMoments(labelName);
  dispatch(changeLabelMomentsAction({ labelId: label.id, moments: res.data }));
  return res;
});

export const { changeLabelsAction, changeLabelMomentsAction } =
  LabelSlice.actions;
export default LabelSlice.reducer;
