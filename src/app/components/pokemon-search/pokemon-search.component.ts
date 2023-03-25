import { AppService } from './../../service/app.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {

  pokemonProcurado: string
  erro404: boolean
  mensagem: string

  pokemonEncontrado = {
    nome: '',
    id: 0,
    peso: '',
    altura: '',
  }

  historicoNome = []
  historicoId = []

  funcao = 'Mostrar histórico'

  imagem: string

  @Output() aoBuscar = new EventEmitter<any>()

  constructor(private service: AppService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.pokemonProcurado = this.route.snapshot.paramMap.get('id')
      this.buscar()
    }
  }

  mostrarHistorico() {
    const historico = document.getElementById('historico')
    if (historico.style.display == 'none') {
      historico.style.display = 'flex'
      this.funcao = 'Fechar histórico'
    } else {
      historico.style.display = 'none'
    }
  }

  public async buscar() {
    this.mensagem = ''
    const pokemon = this.pokemonProcurado.toLocaleLowerCase()

    this.service.getPokemonData(pokemon).subscribe((resultado: any) => {

      this.pokemonEncontrado.nome = resultado.name
      this.pokemonEncontrado.id = resultado.id
      this.pokemonEncontrado.peso = resultado.weight
      this.pokemonEncontrado.altura = resultado.height

      this.aoBuscar.emit(this.pokemonEncontrado)

      if (resultado.sprites.front_default != null) {
        this.imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${resultado.id}.png`
      } else if (resultado.sprites.front_default == null) {
        this.imagem = 'https://cdn.pixabay.com/photo/2018/05/21/13/09/pokemon-3418266_960_720.png'
      }

      const tela = document.getElementById('bloco-resultado')
      const imagens = document.getElementById('imagens')
      imagens.style.display = 'flex'
      tela.style.height = '300px'
      tela.style.transition = '1.5s'

      this.historicoNome.push(resultado.name)
      this.historicoId.push(resultado.id)

    },
      erro => {
        if (erro.status == 404) {
          this.erro404 = true
          this.mensagem = 'Erro 404: Pokemon não encontrado. Tente novamente com outro nome ou ID.'
          this.ngOnInit()
        }
      }
    )

  }

  randomPokemon() {
    const pokemon = this.pokemonProcurado = Math.floor(Math.random() * (1000 - 1 + 1)) + 1 as unknown as undefined
    this.mensagem = ''

    this.service.getPokemonData(pokemon).subscribe((resultado: any) => {

      this.pokemonEncontrado.nome = resultado.name
      this.pokemonEncontrado.id = resultado.id
      this.pokemonEncontrado.peso = resultado.weight
      this.pokemonEncontrado.altura = resultado.height

      this.aoBuscar.emit(this.pokemonEncontrado)

      if (resultado.sprites.front_default != null) {
        this.imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${resultado.id}.png`
      } else if (resultado.sprites.front_default == null) {
        this.imagem = 'https://cdn.pixabay.com/photo/2018/05/21/13/09/pokemon-3418266_960_720.png'
      }

      const tela = document.getElementById('bloco-resultado')
      const imagens = document.getElementById('imagens')
      imagens.style.display = 'flex'
      tela.style.height = '300px'
      tela.style.transition = '1.5s'

      this.historicoNome.push(resultado.name)
      this.historicoId.push(resultado.id)
    })
  }

}
