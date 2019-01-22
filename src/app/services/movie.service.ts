import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MovieService {

    constructor(private httpClient: HttpClient) { }
    // API KEY
    private apiKey = 'fab8dd1048cffb925cdb8fc519972b27';
    // Base url
    private baseUrl = 'https://api.themoviedb.org/3/';

    @Output() searchResults = new EventEmitter();

    // Configuration data for images
    private configUrl = ''.concat(this.baseUrl, 'configuration?api_key=', this.apiKey);

    getConfig() {
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');

        return this.httpClient.get(this.configUrl, { headers: header }).pipe(map((res) => {
            return res;
        }));

    }

    getMovie(query: any) {
        // let movieData = null;
        const movie = ''.concat(this.baseUrl, 'search/movie?api_key=', this.apiKey, '&query=', query);
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');
        return this.httpClient.get(movie, { headers: header }).pipe(map((res) => {
            return res;
        })).pipe(catchError(this.movieNotFound));
    }

    getMovieDetail(id: any) {
        // Movie detail url
        const movieDetailUrl = ''.concat(this.baseUrl, 'movie/', id, '?api_key=', this.apiKey);
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');
        return this.httpClient.get(movieDetailUrl, { headers: header }).pipe(map((res) => {
            return res;
        }));

    }
    getNowPlaying() {
        const nowPlaying = ''.concat(this.baseUrl, 'movie/now_playing?api_key=', this.apiKey, '&language=en-US&page=1');
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');
        return this.httpClient.get(nowPlaying, { headers: header }).pipe(map((res) => {
            return res;
        }));
    }

    private movieNotFound(error: HttpErrorResponse) {
        console.log(error.message);
        return Observable.throw(error.message);
    }

}
