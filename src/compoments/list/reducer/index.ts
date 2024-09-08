import { IAction, IState } from './type';

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'ADD_LIKE':
      return {
        ...state,
        like: [...state.like, action.payload].filter(
          (item, index, self) => self.indexOf(item) === index
        )
      };
    case 'DEL_LIKE':
      return {
        ...state,
        like: state.like.filter((item) => item !== action.payload)
      };
    case 'ADD_COLLECT':
      return {
        ...state,
        collect: [...state.collect, action.payload].filter(
          (item, index, self) => self.indexOf(item) === index
        )
      };
    case 'DEL_COLLECT':
      return {
        ...state,
        collect: state.collect.filter((item) => item !== action.payload)
      };
    default:
      return state;
  }
}

export default reducer;
