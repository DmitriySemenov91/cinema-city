import { movieInterface } from './movie-interface'
interface MDBServiceInterface {
  favoritsList: movieInterface[];
  toggleFavorit: Function;
}
export type { MDBServiceInterface };
