interface ResponseInterface {
  readonly page: number;
  readonly results: [];
  readonly total_pages: number;
  readonly total_results: number;
}
export type { ResponseInterface };
