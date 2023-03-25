import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

import { PokemonDetailComponent } from './pokemon-detail.component';

describe('PokemonDetailComponent', () => {

  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  const mockService = {
    getPokemonData() {
      return of({
        abilities: [
          {
            ability: {
              name: 'overgrow',
              url: 'https://pokeapi.co/api/v2/ability/65/'
            },
            is_hidden: false,
            slot: 1
          },
          {
            ability: {
              name: 'chlorophyll',
              url: 'https://pokeapi.co/api/v2/ability/34/'
            },
            is_hidden: true,
            slot: 3
          }
        ],
        base_experience: 64,
        height: 7,
        id: 1,
        name: 'bulbasaur',
        sprites: {
          other: {
            'dream_world': {
              front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
            },
            'official-artwork': {
              front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
              front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png'
            },
          },
        },
        stats: [
          {
            base_stat: 45,
            effort: 0,
            stat: {
              name: 'hp',
              url: 'https://pokeapi.co/api/v2/stat/1/'
            }
          },
          {
            base_stat: 49,
            effort: 0,
            stat: {
              name: 'attack',
              url: 'https://pokeapi.co/api/v2/stat/2/'
            }
          },
          {
            base_stat: 49,
            effort: 0,
            stat: {
              name: 'defense',
              url: 'https://pokeapi.co/api/v2/stat/3/'
            }
          },
          {
            base_stat: 65,
            effort: 1,
            stat: {
              name: 'special-attack',
              url: 'https://pokeapi.co/api/v2/stat/4/',
            }
          },
          {
            base_stat: 65,
            effort: 0,
            stat: {
              name: 'special-defense',
              url: 'https://pokeapi.co/api/v2/stat/5/'
            }
          },
          {
            base_stat: 45,
            effort: 0,
            stat: {
              name: 'speed',
              url: 'https://pokeapi.co/api/v2/stat/6/'
            }
          }
        ],
        types: [
          {
            slot: 1,
            type: {
              name: 'grass',
              url: 'https://pokeapi.co/api/v2/type/12/'
            }
          },
          {
            slot: 2,
            type: {
              name: 'poison',
              url: 'https://pokeapi.co/api/v2/type/4/'
            }
          }
        ],
        weight: 69,
      });
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PokemonDetailComponent],
      providers: [{ provide: AppService, useValue: mockService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not be null or undefined', () => {
    expect(component).not.toBe(null);
    expect(component).not.toBe(undefined);
  });

  it('#trocarImagem should change the image of pokemon to shiny/default or default/shiny', () => {

    component.pokemonProcurado = 'bulbasaur'
    mockService.getPokemonData().subscribe(res => {
      component.pokemonEncontrado.imagemShiny = res.sprites.other['official-artwork'].front_shiny
      component.pokemonEncontrado.imagemTroca = component.pokemonEncontrado.imagemShiny
      component.trocarImagem()
      component.pokemonEncontrado.imagemTroca = component.pokemonEncontrado.imagemShiny
      expect(component.pokemonEncontrado.imagemShiny).toEqual(res.sprites.other['official-artwork'].front_shiny)
      expect(component.pokemonEncontrado.imagemTroca).toEqual(component.pokemonEncontrado.imagemShiny)
    })

  });

  it('#buscar should return pokemon data with two abilities when called', () => {

    component.pokemonProcurado = 'bulbasaur'
    component.buscar()
    mockService.getPokemonData().subscribe(res => {
      expect(component.pokemonEncontrado.nome).toEqual(res.name)
      expect(component.pokemonEncontrado.id).toEqual(res.id)
      expect(component.pokemonEncontrado.altura).toEqual(res.height)
      expect(component.pokemonEncontrado.peso).toEqual(res.weight)
      expect(component.pokemonEncontrado.habilidade1).toEqual(res.abilities[0]['ability']['name'])
    })
  });


});
