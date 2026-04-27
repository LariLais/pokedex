import { AppService } from './../../service/app.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { forkJoin } from 'rxjs';

interface PokemonListItem {
  id: number;
  name: string;
  type1: string;
  type2?: string;
  imageDefault: string;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(public service: AppService) {}

  titulo = 'Lista de pokemons';

  lista: any[] = [];
  paginaAtual: PokemonListItem[] = [];

  pagina = 0;
  pageSize = 8;

  carregando = false;

  ngOnInit(): void {
    this.chamarLista();
  }

  chamarLista() {
    this.service.getPokemonLista().subscribe((res: any) => {
      this.lista = res.results;
      this.carregarPagina();
    });
  }

  carregarPagina() {
    this.carregando = true;

    const inicio = this.pagina * this.pageSize;
    const fim = inicio + this.pageSize;

    const pokemonsPagina = this.lista.slice(inicio, fim);

    const requests = pokemonsPagina.map((pokemon) =>
      this.service.getPokemonData(pokemon.name),
    );

    forkJoin(requests).subscribe((responses: any[]) => {
      this.paginaAtual = responses.map((res) => ({
        id: res.id,
        name: res.name,
        type1: res.types[0]?.type.name,
        type2: res.types[1]?.type.name,
        imageDefault:
          res.sprites.front_default ||
          'https://cdn.pixabay.com/photo/2018/05/21/13/09/pokemon-3418266_960_720.png',
      }));

      this.carregando = false;
    });
  }

  proximaPagina() {
    if (!this.habilitaAvanco()) {
      this.pagina++;
      this.carregarPagina();
    }
  }

  anteriorPagina() {
    if (!this.habilitaRetrocesso()) {
      this.pagina--;
      this.carregarPagina();
    }
  }

  primeiraPagina() {
    this.pagina = 0;
    this.carregarPagina();
  }

  ultimaPagina() {
    this.pagina = Math.floor(this.lista.length / this.pageSize);
    this.carregarPagina();
  }

  habilitaAvanco(): boolean {
    return (this.pagina + 1) * this.pageSize >= this.lista.length;
  }

  habilitaRetrocesso(): boolean {
    return this.pagina === 0;
  }

  habilitaPrimeiraPagina(): boolean {
    return this.pagina === 0;
  }

  habilitaUltimaPagina(): boolean {
    return (this.pagina + 1) * this.pageSize >= this.lista.length;
  }
}
