import { movieInterface } from "../../interfaces";
import { SAVE_SEARCH_RESULTS, SaveSearchResultsActionType } from "../actions";

const initialState = {
  searchResults: [] as [] | movieInterface[],
};
type InitialStateSearcResultsType = typeof initialState;

//reducer
function searchResultsReducer(
  state: InitialStateSearcResultsType = initialState,
  action: SaveSearchResultsActionType
) {
  switch (action.type) {
    case SAVE_SEARCH_RESULTS:
      return {
        searchResults: action.payload,
      };
    default:
      return state;
  }
}
export { searchResultsReducer };
