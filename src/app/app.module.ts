import { PokemonTiposComponent } from './components/pokemon-tipos/pokemon-tipos.component';
import { FooterComponent } from './structure/footer/footer.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HomeComponent } from './structure/home/home.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { HeaderComponent } from "./structure/header/header.component";
import { HeaderDetailComponent } from './components/pokemon-detail/header-detail/header-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        PokemonListComponent,
        HomeComponent,
        PokemonSearchComponent,
        PokemonTiposComponent,
        PokemonDetailComponent,
        FooterComponent,
        HeaderComponent,
        HeaderDetailComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
    ]
})
export class AppModule { }
