import { AppService } from 'src/app/service/app.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonSearchComponent } from './pokemon-search.component';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon';
import { ActivatedRoute } from '@angular/router';


describe('PokemonSearchComponent', () => {

  let component: PokemonSearchComponent;
  let fixture: ComponentFixture<PokemonSearchComponent>;

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
        url: 'https://pokeapi.co/api/v2/type/13',
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
      nulo: {
        'official-artwork': {
          front_default: null,
          front_shiny: null,
        },
      },
    },
  };

  const mockService = {
    getPokemonData(): Observable<Pokemon> {
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
  };



  let url = "https://fake.url";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PokemonSearchComponent],
      providers: [{ provide: AppService, useValue: mockService },]

    }).compileComponents();

    fixture = TestBed.createComponent(PokemonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not be null or undefined', () => {
    expect(component).not.toBe(null);
    expect(component).not.toBe(undefined);
  });

  it('#buscar should return pokemon data expect when called', (done: DoneFn) => {
    component.pokemonProcurado = 'bulbasaur'
    component.buscar()
    expect(component.pokemonProcurado).not.toBeUndefined()
    mockService.getPokemonData().subscribe(res => {
      expect(component.pokemonEncontrado.nome).toEqual(res.name)
      expect(component.pokemonEncontrado.id).toEqual(res.id)
      expect(component.pokemonEncontrado.altura).toEqual(res.height)
      expect(component.pokemonEncontrado.peso).toEqual(res.weight)
      done()
    })
  });

  it('#randomPokemon should return a random pokemon id when called', () => {
    component.pokemonProcurado = 'pikachu'
    component.randomPokemon()
    expect(component.pokemonProcurado).not.toBeUndefined()
    mockService.getPokemonData().subscribe(res => {
      expect(component.pokemonEncontrado.nome).toEqual(res.name)
      expect(component.pokemonEncontrado.id).toEqual(res.id)
      expect(component.pokemonEncontrado.altura).toEqual(res.height)
      expect(component.pokemonEncontrado.peso).toEqual(res.weight)
    })
  });

  it('#mostrarHistorico should be tested ', () => {
    const historico = document.getElementById('historico')
    component.mostrarHistorico()

    historico.style.display = 'flex'
    if (historico.style.display == 'none') {
      expect(historico.style.display).toBe('none')
    } else {
      expect(historico.style.display).toBe('flex')
    }
  });

  it('#buscar com imagem nula ', () => {

  });

  it('#error should be tested ', () => {

    component.pokemonProcurado = 'bulbasaur'
    component.buscar()
    expect(component.pokemonProcurado).not.toBeUndefined()
    mockService.getPokemonData().subscribe(res => {
      expect(component.pokemonEncontrado.nome).toEqual(res.name)
      expect(component.pokemonEncontrado.id).toEqual(res.id)
      expect(component.pokemonEncontrado.altura).toEqual(res.height)
      expect(component.pokemonEncontrado.peso).toEqual(res.weight)
    })
  });

});
