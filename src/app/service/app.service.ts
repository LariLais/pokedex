import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getPokemonData(nome: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  }

  getPokemonLista() {
    return this.http.get<any>(
      `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
  }

  getType(tipo: number | string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/type/${tipo}`);
  }
}
