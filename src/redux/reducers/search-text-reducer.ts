import { SAVE_SEARCH_TEXT, searchTextActionType } from "../actions";

const initialState = {
  searchText: "" as string,
};
type InitialStateSearcTextType = typeof initialState;

//reducer
function searchTextReducer(
  state: InitialStateSearcTextType = initialState,
  action: searchTextActionType
) {
  switch (action.type) {
    case SAVE_SEARCH_TEXT:
      return {
        searchText: action.payload,
      };
    default:
      return state;
  }
}
export { searchTextReducer };
