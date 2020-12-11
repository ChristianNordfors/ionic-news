import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage: number = 0;

  categoriaActual = '';
  categoriaPage = 0;
  

  constructor( private http: HttpClient ) { }


  private ejectutarQuery<T>( query: string ) {

    query = apiUrl + query;

    return this.http.get<T>( query,  { headers } );

  }


  getTopHeadLines() {

    this.headlinesPage ++;
    
    return this.ejectutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&page=${ this.headlinesPage }`);
  }
  getTopHeadLinesCategoria( categoria: string ) {

    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    
    
    
    return this.ejectutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&category=${ categoria }&page=${ this.categoriaPage}`);
  }

}
