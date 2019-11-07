import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  defaultImg = '../assets/no-image.jpg';
  loading: boolean;

  constructor(private router: ActivatedRoute,
              private location: Location,
              private movieService: MovieService) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie() {
    this.loading = true;
    const id = this.router.snapshot.paramMap.get('id').toString();
    this.movieService.getMovie(id)
        .subscribe(movie => {
          this.loading = false;
          this.movie = movie;
        });
  }

  goBack() {
    this.location.back();
  }

  setDefaultImg(movie) {
    movie.poster = this.defaultImg;
  }
}
