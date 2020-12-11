import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  // El parámetro "static", si es true resolverá los resultados de la consulta antes de que se ejecute la detección de cambios,
  // si es false resolverá después de la detección de cambios. El valor predeterminado es falso.
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];

    this.cargarNoticias( this.categorias[0] );
  }

  cambioCategoria( event ) {

    // console.log(event.detail.value);
    this.noticias = [];
    
    this.cargarNoticias( event.detail.value );
    
  }


  cargarNoticias( categoria: string, event? ) {

    // this.segment.value = this.categorias[0];

    this.noticiasService.getTopHeadLinesCategoria( categoria )
            .subscribe( resp => {
              // console.log( resp );

              // if (resp.articles.length === 0) {
              //   event.target.disabled = true;
              //   event.target.complete();
              // }
              
              this.noticias.push( ...resp.articles );

              if ( event ) {
                event.target.complete();
              }
            });  
  }

  loadData( event ) {

    this.cargarNoticias( this.segment.value, event );
    
  }


}
