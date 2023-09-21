import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable:true}),
    publisher:        new FormControl<Publisher>( Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  })

  public publishers = [
    {id:'DC Comics', desc: 'DC - Comics'},
    {id:'Marvel Comics', desc: 'Marvel - Comics'}
  ];
  
  constructor(
    private herosService: HeroesService,
  ) { }

  ngOnInit(): void {
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(){

    if( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.herosService.updateHero(this.currentHero)
        .subscribe( hero =>{
          //TODO: mostrar snackbar
        });
    }

    this.herosService.addHero( this.currentHero )
      .subscribe( hero => {
        //TODO: mostrar snackbar y navegar a /hero/edit/hero.id
      })
  }
}
