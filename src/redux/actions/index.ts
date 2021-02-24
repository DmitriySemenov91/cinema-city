import { movieInterface } from "../../interfaces";
//actions
const UPDATE_FAVORITS = "UPDATE_FAVORITS";
const SAVE_SEARCH_RESULTS = "SAVE_SEARCH_RESULTS";
const GET_POPULARS = "GET_POPULARS";
const SAVE_SEARCH_TEXT = "SAVE_SEARCH_TEXT";
const SAVE_PAGE = "SAVE_PAGE";
const SAVE_LOCATION = "SAVE_LOCATION";

//actions types
type UpdateFavoritsActionType = {
  type: typeof UPDATE_FAVORITS;
  payload: movieInterface[];
};
type SaveSearchResultsActionType = {
  type: typeof SAVE_SEARCH_RESULTS;
  payload: movieInterface[];
};
type GetPopularsActionType = {
  type: typeof GET_POPULARS;
  payload: movieInterface[];
};
type searchTextActionType = {
  type: typeof SAVE_SEARCH_TEXT;
  payload: string;
};
type savePageActionType = {
  type: typeof SAVE_PAGE;
  payload: number;
};
type SaveLocationActionType = {
  type: typeof SAVE_LOCATION;
  payload: string;
};

//action creators
const UpdateFavorits: Function = (
  payload: movieInterface[]
): UpdateFavoritsActionType => {
  return {
    type: UPDATE_FAVORITS,
    payload: payload,
  };
};
const SaveSearchResults: Function = (
  payload: movieInterface[]
): SaveSearchResultsActionType => {
  return {
    type: SAVE_SEARCH_RESULTS,
    payload: payload,
  };
};
const GetPopulars: Function = (
  payload: movieInterface[]
): GetPopularsActionType => {
  return {
    type: GET_POPULARS,
    payload: payload,
  };
};
const SaveSearchText: Function = (payload: string): searchTextActionType => {
  return {
    type: SAVE_SEARCH_TEXT,
    payload: payload,
  };
};
const SavePage: Function = (page: number): savePageActionType => {
  return {
    type: SAVE_PAGE,
    payload: page,
  };
};
const SaveLocation: Function = (location: string): SaveLocationActionType => {
  return {
    type: SAVE_LOCATION,
    payload: location,
  };
};

export type {
  UpdateFavoritsActionType,
  SaveSearchResultsActionType,
  GetPopularsActionType,
  searchTextActionType,
  savePageActionType,
  SaveLocationActionType,
};
export {
  UpdateFavorits,
  SaveSearchResults,
  GetPopulars,
  SaveSearchText,
  SavePage,
  SaveLocation,
  UPDATE_FAVORITS,
  SAVE_SEARCH_RESULTS,
  GET_POPULARS,
  SAVE_SEARCH_TEXT,
  SAVE_PAGE,
  SAVE_LOCATION,
};
