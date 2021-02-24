// INCOMING PARAMS: id, lang, query;
export default class MovieDBService {
  _API_URL: string = "https://api.themoviedb.org/3/movie/";
  _API_URL_SEACRCH: string = "https://api.themoviedb.org/3/search/movie";
  _API_KEY: string = "?api_key=a28e64474e37ed0554fd9ce97aa5293b";

  getMovieDescription = async (
    id: number,
    lang: "en-US" | "ru-RU" = "en-US"
  ) => {
    return await fetch(
      `${this._API_URL}${id}${this._API_KEY}&language=${lang}`
    ).then((res) => res.json());
  };

  getRecommendations = async (
    id: number,
    lang: "en-US" | "ru-RU" = "en-US"
  ) => {
    return await fetch(
      `${this._API_URL}${id}/recommendations${this._API_KEY}&language=${lang}&page=1`
    ).then((res) => res.json());
  };

  getPopular = async (lang: "en-US" | "ru-RU" = "en-US") => {
    return await fetch(
      `${this._API_URL}popular${this._API_KEY}&language=${lang}&page=1`
    ).then((res) => res.json());
  };

  searchMovie = async (
    query: string = "",
    lang: "en-US" | "ru-RU" = "en-US",
    page: number = 1
  ) => {
    return await fetch(
      `${this._API_URL_SEACRCH}${this._API_KEY}&language=${lang}&query=${query}&page=${page}&include_adult=false`
    ).then((res) => res.json());
  };
}
