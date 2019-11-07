import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title = 'Tour of Movies';
  searchMode = false;
  route: string;
  backAvailable: boolean;
  term: string;

  constructor(location: Location, router: Router, private searchService: SearchService) {
    router.events.subscribe(val => {
      if (location.path() === '/movies') {
        this.route = 'Movies';
        this.backAvailable = false;
        if (this.term) {
          this.searchMode = true;
        }
      } else {
        this.backAvailable = true;
        this.route = 'Movie Details';
        if (this.searchMode) {
          this.searchMode = false;
        }
      }
    });
  }


  ngOnInit() {
    this.searchService.actualTerm.subscribe(term => this.term = term);
  }

  toggleSearch() {
    this.searchMode = !this.searchMode;
    if (!this.searchMode && this.term) {
      this.searchService.changeTerm('');
    }
  }

  search(term: string): void {
    this.searchService.changeTerm(term);
  }

}
