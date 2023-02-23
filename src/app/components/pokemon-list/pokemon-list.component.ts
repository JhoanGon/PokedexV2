import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable, catchError, of } from 'rxjs';
import { PokemonDetail } from '../../models/pokemon.detail';
import { PokemonList } from '../../models/pokemon.list';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass'],
})
export class PokemonListComponent implements OnInit {
  search: FormControl = new FormControl('');
  pokemons: PokemonDetail[] = [];
  classicMode: boolean = false;
  total: number;
  page = 0;
  nombrePokemons: string [] =[];
  valor: string ;

  private offset: number;
  isLoading: boolean;
  isLastPage = false;
  contador: number;
  idPokemonUrlDif: number [] = [865,866,875,876,877,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905];

  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;
  showFirstLastButtons = true;

  cols: string;
  rowHeight: string;
  gutterSize: string;

  constructor(
    private pokemonService: PokemonService,
    private snackBar: MatSnackBar,
    private _dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.page = 0;
    this.cols = "";
    this.rowHeight = "";
    this.gutterSize = "";
  }

  ngOnInit(): void {
    this.getPage(this.page * 1);
    if (isPlatformBrowser(this.platformId)) {
      this.actualizarValor();
    }
  }
  onPageChange(event: { pageIndex: number; }) {
    this.page = event.pageIndex;
    this.getPage(this.page * 9);
  }

  getPage(offset: number) {
    if (!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService
        .getPokemonList(offset)
        .subscribe((list: PokemonList[]) => {
          if (list.length === 0) {
            this.isLastPage = true;
          }
          if (!this.isLastPage) {
            this.contador = offset;
            //console.log(this.contador);
            if(this.contador> 899){
              this.getPokemon(list.slice(0,5));
            }else{
              this.getPokemon(list.slice(0,9));
            }
          }
        });
    }
    this.pokemonService.getAllPokemonSize().subscribe((size: number) => {
      this.total = size;
      //console.log('Total: ', this.total);
    })
    //console.log(offset);
    /*this.pokemonService.getPokemonListName().subscribe((name: string[]) => {
      this.nombrePokemons = name;
      console.log('Total: ', this.nombrePokemons);
    })*/
  }

  onSearchPokemon(): void {
    const value = this.search.value;
    if (value === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.pokemonService.getPokemonDetail(value).subscribe(
        (pokemon: PokemonDetail) => {
          console.log(this.searchPokemon);
          this.searchPokemon = pokemon;
          this.isLoading = false;
        },
        (error: any) => {
          this.isLoading = false;
          if (error.status === 404) {
            this.snackBar.open('Sorry, Pokemon not found', 'Ok', {
              duration: 5000,
            });
          }
        }
      );
    }
  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if (element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(this.pokemonService.getPokemonDetail(value.name));
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      this.pokemons = pokemons;
      this.offset += 1;
      this.isLoading = false;
    });
  }

  getPrincipalType(list: any[]) {
    return list.filter((x) => x.slot === 1)[0]?.type.name;
  }

  onDetail(pokemon: PokemonDetail): void {
    this._dialog.open(PokemonDetailComponent, {
      data: { pokemon, classicMode: this.classicMode },
      panelClass: 'custom-dialog-container'
    });
  }

  @HostListener('window:resize')
  actualizarValor(): void {
    if (window.innerWidth < 768) {
      this.cols = "1";
      this.rowHeight = "1:1"
      this.gutterSize = "5px"
    } else if (window.innerWidth < 992) {
      this.cols = "1";
      this.rowHeight = "1:1"
      this.gutterSize = "5px"
    } else if (window.innerWidth < 1400){
      this.cols = "2";
      this.rowHeight = "2:1"
      this.gutterSize = "5px"
    }else {
      this.cols = "3";
      this.rowHeight = "3:1"
      this.gutterSize = "16px"
    }
    console.log(`cols: ${this.cols}`);
  }

}


