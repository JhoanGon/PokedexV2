import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "./shared/shared.module";
import { PokemonService } from "./services/pokemon.service";
import { HeaderComponent } from './header/header.component';
import { FlipCardModule } from "./components/flip-card/flip-card.module";
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        PokemonListComponent,
        PokemonDetailComponent,
        HeaderComponent
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' },PokemonService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        FlipCardModule,
        AppRoutingModule
      ]
})
export class AppModule { }
