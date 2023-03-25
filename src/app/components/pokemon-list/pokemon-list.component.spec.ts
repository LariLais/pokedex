import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon';
import { AppService } from 'src/app/service/app.service';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  const mockService = {
    getPokemonLista() {
      return of({
        data: {
          id: 1,
          name: 'pikachu',
          img: 'pikachuImgTest',
          type: 'eletric',
          type2: null,
        },
      });
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PokemonListComponent],
      providers: [{ provide: AppService, useValue: mockService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
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

  it('#chamarLista should load list of pokemons when start', () => {

  })
});
