import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';



@NgModule({
  declarations: [
    NoticiaComponent,
    NoticiasComponent
  ],
  exports: [
    // Se exporta para utilizarlo en las otras paginas
    // Solamente el NoticiasComponent porque NoticiaComponent solo depende de NoticiasComponent
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
