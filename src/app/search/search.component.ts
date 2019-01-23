import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchResults = new EventEmitter();
  movieName: string;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
  }

  searchMovie(movieName: string) {
    if (movieName) {
      this.movieService.getMovie(movieName).subscribe((res) => {
        this.searchResults.emit(res['results']);
        if (this.searchResults) {
          if (this.router.url !== '/') {
            this.router.navigateByUrl('/');
          }
        }
      });
    }
  }
}

