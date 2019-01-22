import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieSearch';
  constructor(private movieService: MovieService) {}

  applySearch(event: any) {
    console.log('this is an event ' + JSON.stringify(event));
    this.movieService.searchResults.emit(event);
  }
}

