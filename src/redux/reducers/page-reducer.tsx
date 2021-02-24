import {
  SAVE_PAGE,
  savePageActionType
} from "../actions";

const initialState = {
  page: 1 as number
};
type InitialStatePageType = typeof initialState;

//reducer
function pageReducer(
  state: InitialStatePageType = initialState,
  action: savePageActionType
) {
  switch (action.type) {
    case SAVE_PAGE:
      return {
        page: action.payload,
      };
    default:
      return state;
  }
};
export { pageReducer };