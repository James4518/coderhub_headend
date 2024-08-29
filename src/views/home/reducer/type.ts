export interface IState {
  like: number[];
  collect: number[];
}

export type IAction =
  | { type: 'ADD_LIKE'; payload: number }
  | { type: 'DEL_LIKE'; payload: number }
  | { type: 'ADD_COLLECT'; payload: number }
  | { type: 'DEL_COLLECT'; payload: number };
