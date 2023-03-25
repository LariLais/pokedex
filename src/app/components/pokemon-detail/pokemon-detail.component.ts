import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonProcurado: string;
  title = 'Default Image';

  @Input() progresso: number = 100;

  pokemonEncontrado = {
    nome: '',
    id: 0,
    habilidade1: '-',
    habilidade2: '-',
    habilidade3: '-',
    tipo1: '',
    tipo2: '',
    ataque: 0,
    defesa: 0,
    hp: 0,
    specialAttack: 0,
    specialDefense: 0,
    velocidade: 0,
    peso: 0,
    altura: 0,
    imagemTroca: '',
    imagemDefault: '',
    imagemShiny: '',
    icon1: '',
    icon2: '',
  };

  @Output() aoBuscar = new EventEmitter<any>();

  constructor(private service: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.pokemonProcurado = this.route.snapshot.paramMap.get('id');
      this.buscar();
    }
    this.trocarImagem();
  }

  public async buscar() {
    const pokemon = this.pokemonProcurado.toLocaleLowerCase();

    this.service.getPokemonData(pokemon).subscribe((resultado: any) => {
      /* Definição do nome */
      this.pokemonEncontrado.nome = resultado.name;

      /* Definição do id */
      this.pokemonEncontrado.id = resultado.id;

      /* Definição das habilidades */
      if (resultado.abilities.length == 1) {
        this.pokemonEncontrado.habilidade1 =
          resultado.abilities[0].ability.name;
      } else if (resultado.abilities.length == 2) {
        this.pokemonEncontrado.habilidade1 =
          resultado.abilities[0].ability.name;
        this.pokemonEncontrado.habilidade2 =
          resultado.abilities[1].ability.name;
      } else {
        this.pokemonEncontrado.habilidade1 =
          resultado.abilities[0].ability.name;
        this.pokemonEncontrado.habilidade2 =
          resultado.abilities[1].ability.name;
        this.pokemonEncontrado.habilidade3 =
          resultado.abilities[2].ability.name;
      }

      /* Definição do peso */
      this.pokemonEncontrado.peso = resultado.weight;

      /* Definição da altura */
      this.pokemonEncontrado.altura = resultado.height;

      /* Definição dos tipos */
      if (resultado.types.length == 1) {
        this.pokemonEncontrado.tipo1 = resultado.types[0].type.name;
      } else {
        this.pokemonEncontrado.tipo1 = resultado.types[0].type.name;
        this.pokemonEncontrado.tipo2 = resultado.types[1].type.name;
      }

      /* Definição dos base stats */

      this.pokemonEncontrado.hp = resultado.stats[0].base_stat;
      this.pokemonEncontrado.ataque = resultado.stats[1].base_stat;
      this.pokemonEncontrado.defesa = resultado.stats[2].base_stat;
      this.pokemonEncontrado.specialAttack = resultado.stats[3].base_stat;
      this.pokemonEncontrado.specialDefense = resultado.stats[4].base_stat;
      this.pokemonEncontrado.velocidade = resultado.stats[5].base_stat;

      /* Definição das imagens */

      this.pokemonEncontrado.imagemDefault =
        resultado.sprites.other['official-artwork'].front_default;
      this.pokemonEncontrado.imagemTroca =
        resultado.sprites.other['official-artwork'].front_default;

      this.pokemonEncontrado.imagemShiny =
        resultado.sprites.other['official-artwork'].front_shiny;

      this.definirBackground();
      this.definirIcons();
      this.aoBuscar.emit(this.pokemonEncontrado);
    });
  }

  definirBackground() {
    /* Definição de variavéis */

    let tipo1 = document.getElementById('tipo1');
    let tipo2 = document.getElementById('tipo2');
    let corpo = document.getElementById('corpo');
    let fundo = document.getElementById('fundo-imagem');

    /* Definição de icons de tipos */

    // TIPO 1
    tipo1.style.backgroundColor = `var(--${this.pokemonEncontrado.tipo1})`;
    corpo.style.backgroundImage = `var(--${this.pokemonEncontrado.tipo1}W)`;
    fundo.style.backgroundColor = `var(--${this.pokemonEncontrado.tipo1})`;

    // TIPO 2
    tipo2.style.backgroundColor = `var(--${this.pokemonEncontrado.tipo2})`;
  }

  definirIcons() {
    // Icon 1
    this.pokemonEncontrado.icon1 = `var(--${this.pokemonEncontrado.tipo1}I)`;

    // Icon 2
    this.pokemonEncontrado.icon2 = `var(--${this.pokemonEncontrado.tipo2}I)`;
  }

  trocarImagem() {
    if (
      this.pokemonEncontrado.imagemTroca == this.pokemonEncontrado.imagemDefault
    ) {
      this.pokemonEncontrado.imagemTroca = this.pokemonEncontrado.imagemShiny;
      this.title = 'Shiny image';
    } else {
      this.pokemonEncontrado.imagemTroca = this.pokemonEncontrado.imagemDefault;
      this.title = 'Default image';
    }
  }
}
