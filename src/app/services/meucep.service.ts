import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MeucepService {

  constructor(private http: HttpClient) { }

  localizaCep(cod: String){
    const url = `https://viacep.com.br/ws/${cod}/json/`;

    const header = {
      headers : new HttpHeaders().set('Content-type', 'aplication/json'),
    };

    return this.http.get(url, header);
  }
}
