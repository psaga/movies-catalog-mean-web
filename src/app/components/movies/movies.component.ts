import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  defaultImg = '../assets/no-image.jpg';
  term: string;
  skip: number;
  loading: boolean;

  constructor(private movieService: MovieService,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.actualTerm.subscribe(term => {
      this.term = term;
      this.skip = 0;
      this.loading = true;
      this.movies = [];
      this.getMovies();
    });
  }



  getMovies(): void {
    this.movieService.getMovies(this.term, this.skip)
        .subscribe(movies => {
          this.loading = false;
          if ( this.skip > 0 ) {
            this.movies = [...this.movies, ...movies];
          } else {
            this.movies = movies;
          }
        });
  }

  setDefaultImg(movie) {
    movie.poster = this.defaultImg;
  }

  onScroll() {
    this.skip += 20;
    this.getMovies();
  }
}
