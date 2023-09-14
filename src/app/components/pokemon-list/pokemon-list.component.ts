import { AppService } from './../../service/app.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  constructor(public service: AppService) {}

  ngOnInit(): void {
    this.chamarLista();
    this.lista = [];
  }

  titulo = 'Lista de pokemons';

  indexAtual: number = -1;
  pageSize: number = 8;
  paginaAtual: Pokemon[];
  lista: Pokemon[];

  chamarLista() {
    this.service.getPokemonLista().subscribe((res: any) => {
      this.lista = res.results;
      for (let i = 0; i < this.lista.length; i++) {
        this.service
          .getPokemonData(this.lista[i].name)
          .subscribe((res: any) => {
            this.lista[i].id = res.id;

            if (res.types.length == 1) {
              this.lista[i].type1 = res.types[0].type.name;
            } else {
              this.lista[i].type1 = res.types[0].type.name;
              this.lista[i].type2 = res.types[1].type.name;
            }

            this.lista[i].imageDefault = res.sprites.front_default;

            if (res.sprites.front_default == null) {
              this.lista[i].imageDefault =
                'https://cdn.pixabay.com/photo/2018/05/21/13/09/pokemon-3418266_960_720.png';
            }
          });
      }
      this.proximaPagina();
    });
  }

  habilitaAvanco(): Boolean {
    if (this.indexAtual < this.lista.length - 1) {
      return false;
    } else {
      return true;
    }
  }

  habilitaRetrocesso(): Boolean {
    if (this.indexAtual - (this.pageSize - 1) > 0) {
      return false;
    } else {
      return true;
    }
  }

  proximaPagina() {
    this.paginaAtual = [];
    for (let i = 0; i < this.pageSize; i++) {
      this.indexAtual = this.indexAtual + 1;
      this.paginaAtual.push(this.lista[this.indexAtual]);
    }
    this.habilitaAvanco();
    this.habilitaRetrocesso();
  }

  anteriorPagina() {
    this.paginaAtual = [];
    this.indexAtual = this.indexAtual - 7;
    for (let i = 0; i < this.pageSize; i++) {
      this.indexAtual = this.indexAtual - 1;
      this.paginaAtual.push(this.lista[this.indexAtual]);
    }
    this.indexAtual = this.indexAtual + 7;
    this.paginaAtual.reverse();
    this.habilitaAvanco();
    this.habilitaRetrocesso();
  }

  primeiraPagina() {
    this.paginaAtual = [];
    this.indexAtual = -1;
    for (let i = 0; i < this.pageSize; i++) {
      this.indexAtual = this.indexAtual + 1;
      this.paginaAtual.push(this.lista[this.indexAtual]);
    }
  }

  ultimaPagina() {
    this.paginaAtual = [];
    this.indexAtual = this.lista.length - 1;
    for (let i = 0; i < this.pageSize; i++) {
      this.indexAtual = this.indexAtual - 1;
      this.paginaAtual.push(this.lista[this.indexAtual]);
    }
    this.indexAtual = this.indexAtual + 8;
    this.paginaAtual.reverse();
  }

  habilitaPrimeiraPagina() {
    if (this.indexAtual == 7) {
      return true;
    } else {
      return false;
    }
  }

  habilitaUltimaPagina() {
    if (this.indexAtual >= this.lista.length - 1) {
      return true;
    } else {
      return false;
    }
  }
}
