import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonDetail } from '../../models/pokemon.detail';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.sass'],

})

export class PokemonDetailComponent implements OnInit {

  public pokemon: PokemonDetail;
  classicMode: boolean;
  idPokemonUrlDif: number [] = [865,866,875,876,877,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.pokemon = data.pokemon;
    this.classicMode = data.classicMode;
  }

  ngOnInit(): void {
  }


  getAbilities(): string {
    return this.pokemon.abilities.map(x => `- ${x.ability.name}<br>`).join('');
  }

  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }

}
