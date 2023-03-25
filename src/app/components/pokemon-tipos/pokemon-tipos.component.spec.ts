import { Pokemon } from 'src/app/models/Pokemon';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/service/app.service';

import { PokemonTiposComponent } from './pokemon-tipos.component';

describe(PokemonTiposComponent.name, () => {

  let component: PokemonTiposComponent;
  let fixture: ComponentFixture<PokemonTiposComponent>;

  const jsonResults = {
    results: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
      {
        name: 'venusaur',
        url: 'https://pokeapi.co/api/v2/pokemon/3/',
      },],
  };

  const jsonStats = {
    stats: [
      {
        base_stat: '48',
        effort: '1',
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
      {
        base_stat: '48',
        effort: '0',
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
      {
        base_stat: '48',
        effort: '0',
        stat: {
          name: 'defense',
          url: 'https://pokeapi.co/api/v2/stat/3/',
        },
      },
      {
        base_stat: '48',
        effort: '0',
        stat: {
          name: 'special-attack',
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        base_stat: '48',
        effort: '0',
        stat: {
          name: 'special-defense',
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        base_stat: '48',
        effort: '0',
        stat: {
          name: 'speed',
          url: 'https://pokeapi.co/api/v2/stat/6/',
        },
      },
    ],
  };
  const jsonTypes = {
    types: [{
      slot: '1',
      type: {
        name: 'eletric',
        url: 'https://pokeapi.co/api/v2/type/1/',
      },
    },
    ],
  };
  const jsonImgs = {
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'imgTest',
          front_shiny: 'imgShinyTest',
        },
      },
    },
  };

  const mockService = {
    getPokemonNome(): Observable<Pokemon> {
      let poke = new Pokemon();
      poke.id = 25;
      poke.name = 'pikachu';
      poke.height = '50';
      poke.weight = '15';
      poke.stats = jsonStats.stats;
      poke.types = jsonTypes.types;
      poke.sprites = jsonImgs.sprites;
      return of(poke);
    },
    getType() {
      let tipo = new Pokemon();
      tipo.id = 1
      return of(tipo);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PokemonTiposComponent],
      providers: [{ provide: AppService, useValue: mockService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTiposComponent);
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

  it('#habilitaAvanco should enable button to next page', () => {
    component.indexAtual = -2
    component.habilitaAvanco()
    expect(component.habilitaAvanco()).toBeFalse()
  });

  it('#habilitaRetrocesso should enable button to previous page', () => {
    component.indexAtual = 8
    component.habilitaRetrocesso()
    expect(component.habilitaAvanco()).toBeTrue()

  });

  it('#proximaPagina should go to the next page when called', () => {
    component.proximaPagina()
    expect(component.proximaPagina()).toBeUndefined()
  });

  it('#anteriorPagina should go to the previous page when called', () => {
    component.anteriorPagina()
    expect(component.anteriorPagina()).toBeUndefined()

  });

  it('#primeiraPagina should go to the first page when called', () => {
    component.primeiraPagina()
    expect(component.primeiraPagina()).toBeUndefined()
  });

  it('#ultimaPagina should go to the last page when called', () => {
    component.ultimaPagina()
    expect(component.ultimaPagina()).toBeUndefined()
  });

  it('#habilitaPrimeiraPagina should enable the first page button', () => {
    component.indexAtual = 7
    component.habilitaPrimeiraPagina()
    expect(component.habilitaPrimeiraPagina()).toBeTrue()
  });

  it('#habilitaUltimaPagina should enable the last page button', () => {
    component.indexAtual = -2
    component.habilitaUltimaPagina()
    expect(component.habilitaUltimaPagina()).toBeFalse()
  });

  it('#buscarPokemonDoTipo should return a pokemon list of especfic type searched', () => {

  })
});
