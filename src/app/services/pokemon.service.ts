import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from 'rxjs';
import { PokemonList } from "../models/pokemon.list";
import { PokemonDetail } from "../models/pokemon.detail";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2/';

    constructor(private http: HttpClient) { }


    getPokemonList(offset: number, limit: number = 905) : Observable<PokemonList[]> {
      return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?limit=' + limit + '&offset=' + offset)
        .pipe(
            map((x: any) => x.results)
        );
    }

    getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
        return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
    }

    getAllPokemonSize(): Observable<number> {
      return this.http.get<any>(this.baseUrl + 'pokemon?limit=905')
        .pipe(
          map((response: any) => response.results.length)
        );
    }
    getPokemonListName(): Observable<string[]> {
      return this.http.get<any>(this.baseUrl + 'pokemon?limit=905')
        .pipe(
          map((response: any) => response.results.map((pokemon: any) => pokemon.name))
        );
    }
}
