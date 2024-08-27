export interface IState {
  like: Map<string, boolean>;
  collect: Map<string, boolean>;
}

export type IAction =
  | { type: 'ADD_LIKE'; payload: { key: string; value: boolean } }
  | { type: 'DEL_LIKE'; payload: { key: string } }
  | { type: 'ADD_COLLECT'; payload: { key: string; value: boolean } }
  | { type: 'DEL_COLLECT'; payload: { key: string } };
