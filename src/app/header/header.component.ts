import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PokemonDetail } from '../models/pokemon.detail';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements AfterViewInit {
  titulo: string = "Pokedex";
  imgSrc = "assets/images/Pokedex2.png";
  showOverflow = false;
  pokemon: PokemonDetail;


  @ViewChild('slogan') slogan: ElementRef;
  @ViewChild('btn') btn: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    window.addEventListener('scroll', () => {
      let value = window.scrollY;
    });

  }
  activarOverflow() {
    this.showOverflow = true;
  }
  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }
}
