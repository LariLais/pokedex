import { AppService } from './../../service/app.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface PokemonSearchResult {
  nome: string;
  id: number;
  peso: string;
  altura: string;
}

interface HistoricoItem {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})
export class PokemonSearchComponent implements OnInit {
  pokemonProcurado: string = '';
  mensagem: string = '';

  imagem: string = '';

  mostrarHist = false;
  funcao = 'Mostrar histórico';

  pokemonEncontrado: PokemonSearchResult = {
    nome: '',
    id: 0,
    peso: '',
    altura: '',
  };

  historico: HistoricoItem[] = [];

  @Output() aoBuscar = new EventEmitter<PokemonSearchResult>();

  constructor(
    private service: AppService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');

    if (param) {
      this.pokemonProcurado = param;
      this.buscar();
    }
  }

  mostrarHistorico() {
    this.mostrarHist = !this.mostrarHist;
    this.funcao = this.mostrarHist ? 'Fechar histórico' : 'Mostrar histórico';
  }

  buscar() {
    if (!this.pokemonProcurado) return;

    this.mensagem = '';
    const pokemon = this.pokemonProcurado.toLowerCase();

    this.service.getPokemonData(pokemon).subscribe({
      next: (resultado: any) => {
        this.pokemonEncontrado = {
          nome: resultado.name,
          id: resultado.id,
          peso: resultado.weight,
          altura: resultado.height,
        };

        this.aoBuscar.emit(this.pokemonEncontrado);

        this.imagem = resultado.sprites.front_default
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${resultado.id}.png`
          : 'https://cdn.pixabay.com/photo/2018/05/21/13/09/pokemon-3418266_960_720.png';

        this.historico.unshift({
          id: resultado.id,
          nome: resultado.name,
        });

        if (this.historico.length > 10) {
          this.historico.pop();
        }
      },

      error: (erro) => {
        if (erro.status === 404) {
          this.mensagem = 'Pokémon não encontrado. Tente outro nome ou ID.';
        }
      },
    });
  }

  randomPokemon() {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    this.pokemonProcurado = String(randomId);
    this.buscar();
  }
}
