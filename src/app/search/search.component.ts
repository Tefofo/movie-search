import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  @Output() searchResults = new EventEmitter();
  movieID: any;
  options: string[] = ['Batman', 'The punisher', 'Constantine', 'Thor', 'Amazing spider man', 'Avengers'];
  filteredOptions: Observable<string[]>;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  searchMovie(movieName: string) {
    this.movieService.getMovie(movieName).subscribe((res) => {
      this.searchResults.emit(res['results']);
      console.log(this.searchResults);
      console.log(this.router.url);
      if (this.searchResults) {
        if (this.router.url !== '/') {
          // this.movieService.searchResults.emit(res['results']);
          this.searchResults.emit(res['results']);
          this.router.navigateByUrl('/');
        }
      }
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}

