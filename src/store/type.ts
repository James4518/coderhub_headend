import store from '.';

export type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;
export type DispatchType = typeof store.dispatch;
export interface IThunkState {
  state: IRootState;
}
