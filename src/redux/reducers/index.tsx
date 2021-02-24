import { combineReducers } from 'redux';
import { favoritsReducer } from './favorits-reducer';
import { searchResultsReducer } from './search-results-reducer';
import { popularsReducer } from './populars-reducer';
import { searchTextReducer } from './search-text-reducer';
import { pageReducer } from './page-reducer';
import { locationReducer } from './location-reducer';

const rootReducer = combineReducers({
  favoritsList: favoritsReducer,
  searchResults: searchResultsReducer,
  popularsList: popularsReducer,
  searchText: searchTextReducer,
  page: pageReducer,
  location: locationReducer
});
type RootStateType = ReturnType<typeof rootReducer>;



export type { RootStateType }
export { rootReducer };