import { PokemonTiposComponent } from './components/pokemon-tipos/pokemon-tipos.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { HomeComponent } from './structure/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "search", component: PokemonSearchComponent },
  { path: 'list', component: PokemonListComponent },
  { path: 'types', component: PokemonTiposComponent },
  { path: 'detail/:id', component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
