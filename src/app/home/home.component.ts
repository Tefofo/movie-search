import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: any;
  searchResults: any;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getNowPlaying().subscribe(res => {
      this.nowPlayingMovies = res['results'];
    });
    this.movieService.searchResults.subscribe(res => {
      this.searchResults = res;
      console.log('Home component results ' + JSON.stringify(this.searchResults));
    });
  }

}
