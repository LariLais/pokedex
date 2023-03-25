import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockComponent } from 'mock-component';
import { AppService } from './app.service';

describe('AppService', () => {

  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MockComponent(AppService)],
    }),
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be null or undefined', () => {
    expect(service).not.toBe(null);
    expect(service).not.toBe(undefined);
  });

  it('#getPokemonData not be null or undefined', () => {
    expect(service.getPokemonData('bulbasasur')).not.toBeNull()
    expect(service.getPokemonData('bulbasasur')).not.toBeUndefined()
  });

  it('#getPokemonLista not be null or undefined', () => {
    expect(service.getPokemonLista()).not.toBeNull()
    expect(service.getPokemonLista()).not.toBeUndefined()
  });

  it('#getType not be null or undefined', () => {
    expect(service.getType(12)).not.toBeNull()
    expect(service.getType(12)).not.toBeUndefined()
  });

});

