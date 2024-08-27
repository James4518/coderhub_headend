import { IAction, IState } from './type';

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'ADD_LIKE': {
      const { key, value } = action.payload;
      const newLikeMap = new Map(state.like);
      newLikeMap.set(key, value);
      return {
        ...state,
        like: newLikeMap
      };
    }
    case 'DEL_LIKE': {
      const { key } = action.payload;
      const newLikeMap = new Map(state.like);
      newLikeMap.delete(key);
      return {
        ...state,
        like: newLikeMap
      };
    }
    case 'ADD_COLLECT': {
      const { key, value } = action.payload;
      const newCollectMap = new Map(state.collect);
      newCollectMap.set(key, value);
      return {
        ...state,
        collect: newCollectMap
      };
    }
    case 'DEL_COLLECT': {
      const { key } = action.payload;
      const newCollectMap = new Map(state.collect);
      newCollectMap.delete(key);
      return {
        ...state,
        collect: newCollectMap
      };
    }
    default:
      return state;
  }
}

export default reducer;
