import { SAVE_LOCATION, SaveLocationActionType } from "../actions";

const initialState = {
  location: "" as string,
};
type InitialStateLocationType = typeof initialState;

//reducer
function locationReducer(
  state: InitialStateLocationType = initialState,
  action: SaveLocationActionType
) {
  switch (action.type) {
    case SAVE_LOCATION:
      return {
        location: action.payload,
      };
    default:
      return state;
  }
}
export { locationReducer };
