import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { forkJoin } from 'rxjs';

interface PokemonListItem {
  id: number;
  name: string;
  imageDefault: string;
}

@Component({
  selector: 'app-pokemon-tipos',
  templateUrl: './pokemon-tipos.component.html',
  styleUrls: ['./pokemon-tipos.component.scss'],
})
export class PokemonTiposComponent implements OnInit {
  constructor(public service: AppService) {}

  titulo = 'Seleção de Pokemon por tipo';
  tipos = [
    {
      id: 1,
      nome: 'normal',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/21/00/pokemon-3416764_960_720.png',
    },
    {
      id: 2,
      nome: 'fighting',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/01/40/pokemon-3414806_960_720.png',
    },
    {
      id: 3,
      nome: 'flying',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/01/40/pokemon-3414808_960_720.png',
    },
    {
      id: 4,
      nome: 'poison',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/21/00/pokemon-3416765_960_720.png',
    },
    {
      id: 5,
      nome: 'ground',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/21/00/pokemon-3416762_960_720.png',
    },
    {
      id: 6,
      nome: 'rock',
      img: 'https://cdn.pixabay.com/photo/2018/05/21/13/06/pokemon-3418255_960_720.png',
    },
    {
      id: 7,
      nome: 'bug',
      img: 'https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411386_960_720.png',
    },
    {
      id: 8,
      nome: 'ghost',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/01/40/pokemon-3414809_960_720.png',
    },
    {
      id: 9,
      nome: 'steel',
      img: 'https://cdn.pixabay.com/photo/2018/05/21/13/06/pokemon-3418256_960_720.png',
    },
    {
      id: 10,
      nome: 'fire',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/01/40/pokemon-3414807_960_720.png',
    },
    {
      id: 11,
      nome: 'water',
      img: 'https://cdn.pixabay.com/photo/2018/05/21/13/06/pokemon-3418257_960_720.png',
    },
    {
      id: 12,
      nome: 'grass',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/01/41/pokemon-3414810_960_720.png',
    },
    {
      id: 13,
      nome: 'electric',
      img: 'https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411389_960_720.png',
    },
    {
      id: 14,
      nome: 'psychic',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/21/01/pokemon-3416767_960_720.png',
    },
    {
      id: 15,
      nome: 'ice',
      img: 'https://cdn.pixabay.com/photo/2018/05/20/21/00/pokemon-3416763_960_720.png',
    },
    {
      id: 16,
      nome: 'dragon',
      img: 'https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411388_960_720.png',
    },
    {
      id: 17,
      nome: 'dark',
      img: 'https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411387_960_720.png',
    },
    {
      id: 18,
      nome: 'fairy',
      img: 'https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411390_960_720.png',
    },
  ];

  lista: any[] = [];
  paginaAtual: PokemonListItem[] = [];

  pagina = 0;
  pageSize = 8;

  carregando = false;

  ngOnInit(): void {
    this.buscarPokemonDoTipo(1);
  }

  buscarPokemonDoTipo(id: number) {
    this.pagina = 0;
    this.lista = [];
    this.paginaAtual = [];

    this.service.getType(id).subscribe((res: any) => {
      this.lista = res.pokemon.map((p: any) => p.pokemon);
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
