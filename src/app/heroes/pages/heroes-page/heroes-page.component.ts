import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroes-page',
  templateUrl: './heroes-page.component.html',
  styleUrls: ['./heroes-page.component.css']
})
export class HeroesPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.heroesService.getHeroById(id)),
    ).subscribe( hero => {
        if (!hero) {
          return this.router.navigate( ['/heroes/list'])
        }

        this.hero = hero;
        console.log({hero});
        
        return
      }
    )
    
  }

}
