import { Pokemon } from './../../models/Pokemon';
import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-pokemon-tipos',
  templateUrl: './pokemon-tipos.component.html',
  styleUrls: ['./pokemon-tipos.component.scss'],
})
export class PokemonTiposComponent {
  titulo = 'Seleção de Pokemon por tipo';

  constructor(public service: AppService) {}

  ngOnInit(): void {
    this.lista = [];
    this.buscarPokemonDoTipo(0);
  }

  @Input()
  pokemonsDoTipoSelecionado = Array();

  indexAtual: number = -1;
  pageSize: number = 8;
  paginaAtual: Pokemon[];
  lista: Pokemon[];

  public buscarPokemonDoTipo(id: number) {
    if (this.pokemonsDoTipoSelecionado.length > 0) {
      this.paginaAtual = [];
      this.indexAtual = -1;
      this.pokemonsDoTipoSelecionado = [];
    } else {
      this.paginaAtual = [];
      this.indexAtual = -1;
      this.pokemonsDoTipoSelecionado = [];

      this.service.getType(id).subscribe((res: any) => {
        for (let i = 0; i < res.pokemon.length; i++) {
          this.pokemonsDoTipoSelecionado.push(res.pokemon[i].pokemon);
        }

        this.lista = this.pokemonsDoTipoSelecionado;

        for (let i = 0; i < this.lista.length; i++) {
          this.service
            .getPokemonData(this.lista[i].name)
            .subscribe((res: any) => {
              /* Definição de id */
              this.lista[i].id = res.id;

              /* Definição das imagens */

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
    this.indexAtual = this.lista.length + 1;
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
