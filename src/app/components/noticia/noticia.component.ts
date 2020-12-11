import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos: boolean;
  

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private SocialSharing: SocialSharing,
               private dataLocal: DataLocalService ) { }

  ngOnInit() {}


  abrirNoticia() {
    // console.log('Noticia', this.noticia.url);

    // Para que lo abra en el navegador web nativo hay que añadir el segundo argumento '_system'
    const browser = this.iab.create(this.noticia.url, '_system');
    
  }

  
  async lanzarMenu() {
    const existe = this.dataLocal.existeEnFavoritos(this.noticia);

    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share-social',
        cssClass: 'action-dark',
        handler: () => {
          this.SocialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, {
        text: existe ? 'Eliminar de favoritos': 'Agregar a favoritos',
        icon: existe ? 'star' : 'star-outline',
        cssClass: 'action-dark',
        handler: () => {
          existe ? 
          this.dataLocal.borrarNoticia( this.noticia ) :
          this.dataLocal.guardarNoticia( this.noticia ) 
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
    

}
