import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  UpdateFavorits,
  SaveSearchResults,
  GetPopulars,
  SaveSearchText,
  SavePage,
  SaveLocation
} from '../../redux/actions'
import { RootStateType } from '../../redux/reducers';
import MovieDBService from '../../redux/services';
import { MDBServiceContext, MDBServiceInterface } from '../movie-db-service-provider';
import { movieInterface, ResponseInterface } from '../../interfaces';


import Footer from '../footer';
import Header from '../header';
import CardList from '../cards-list';
import { MovieDescription } from '../pages'
import ErrorBoundry from '../error_boundry';
import Spinner from '../spinner';


const App = () => {

  const movieDBService = new MovieDBService();
  const dispatch = useDispatch();

  const { popularsList } = useSelector((state: RootStateType) => state.popularsList);
  const { favoritsList } = useSelector((state: RootStateType) => state.favoritsList);
  const { searchResults } = useSelector((state: RootStateType) => state.searchResults);
  const { searchText } = useSelector((state: RootStateType) => state.searchText);
  const { page } = useSelector((state: RootStateType) => state.page);
  const { location } = useSelector((state: RootStateType) => state.location);

  useEffect(() => {
    movieDBService.getPopular()
      .then((response: ResponseInterface) => {
        const list: movieInterface[] = response.results;
        dispatch(GetPopulars(list))
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);
    let cancelled = false;
    if (!cancelled && location === '/') {
      searchMovies(searchText, page);
    }
    return () => {
      document.removeEventListener('scroll', trackScrolling);
      cancelled = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page, location]);

  const isBottom = (el: HTMLElement) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };
  const trackLocation = (newLocation: string) => {
    dispatch(SaveLocation(newLocation))
  }
  const getSearchText = (text: string) => {
    dispatch(SaveSearchResults([]));
    dispatch(SavePage(1));
    dispatch(SaveSearchText(text));
  }
  const trackScrolling = () => {
    const wrappedElement: any = document.getElementById('footer');
    if (isBottom(wrappedElement)) {
      document.removeEventListener('scroll', trackScrolling);
      const nextPage = page + 1;
      dispatch(SavePage(nextPage));
    }
  };
  const addToList = (data: object, arr: Array<object> | []): Array<object> => {
    return [...arr, data];
  }
  const removeFromList = (id: any, arr: Array<any> | []): Array<object> => {
    const index: number = arr.findIndex(elem => elem.id === id);
    return [
      ...arr.slice(0, index),
      ...arr.slice(index + 1)
    ];
  }
  const toggleFavorit: Function = (movieData: movieInterface) => {
    const { id } = movieData
    favoritsList.some((elem: movieInterface) => elem.id === id) ?
      dispatch(UpdateFavorits(removeFromList(id, favoritsList))) :
      dispatch(UpdateFavorits(addToList(movieData, favoritsList)));
  }
  const searchMovies: Function = (query: string, page: number = 1) => {
    if (query.length < 1) {
      return;
    };
    let inquire = query.toLowerCase();
    type searchLangType = "en-US" | "ru-RU";
    let lang: searchLangType = "en-US";
    if (/^[а-яА-Я]+$/.test(inquire)) {
      lang = "ru-RU";
      inquire = encodeURI(inquire);
    }
    movieDBService.searchMovie(inquire, lang, page)
      .then((response: ResponseInterface) => {
        if (response.results.length < 1) return;
        const newResult = filterResults(searchResults, response.results)
        dispatch(SaveSearchResults(newResult));
      });
  };
  const filterResults = (prevRes: any, newRes: any) => {
    const ids = new Set(prevRes.map((d: any) => d.id));
    return [...prevRes, ...newRes.filter((d: any) => !ids.has(d.id))]
  }
  const MDBSProviderData: MDBServiceInterface = {
    favoritsList,
    toggleFavorit
  }
  if (!popularsList) return <Spinner />

  return (
    <ErrorBoundry>
      <MDBServiceContext.Provider value={MDBSProviderData}>
        <div className='d-flex flex-column flex-shrink-1 bg-secondary'>
          <Router>
            <Header
              trackLocation={trackLocation}
              getSearchText={getSearchText}
            />
            <Switch>
              <Route path='/' exact
                render={(): JSX.Element => <CardList list={searchText ? searchResults : popularsList} />}
              />
              <Route path='/favorits'
                render={() => <CardList list={favoritsList} />}
              />
              <Route path='/description/:id'
                render={({ match }): JSX.Element => {
                  const { id } = match.params;
                  return <MovieDescription id={id} />
                }}
              />
            </Switch>
          </Router>
          <Footer />
        </div>
      </MDBServiceContext.Provider>
    </ErrorBoundry>
  );
};
export default App;
