import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage,
               public toastCtrl: ToastController ) {
    
    this.cargarFavoritos();
    
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    toast.present();
  }


  guardarNoticia( noticia: Article ) {

    const existe = this.noticias.find( noti => (noti.title && noti.description) === (noticia.title && noticia.description) );

    if ( !existe ) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias );
    }

    this.presentToast('Agregado a favoritos');

  }

  async cargarFavoritos() {

    // return await this.storage.get('favoritos');

    const favoritos = await this.storage.get('favoritos');

    // Valida si existe algo en favoritos y no es null para evitar error a limpiar storage
    // pero si nunca se le asigna un valor no hace falta ya que al inicializar el servicio noticias inicializa como un arreglo vacio
    // console.log(favoritos);
    if( favoritos ) {
      this.noticias = favoritos;
    }

    
  }

  borrarNoticia( noticia: Article ) {

    this.noticias = this.noticias.filter( noti =>( noti.title && noti.source) !== (noticia.title && noticia.source) );
    this.storage.set('favoritos', this.noticias );

    this.presentToast('Eliminado de favoritos');
  }

  existeEnFavoritos( noticia: Article) {
    const existe = this.noticias.find( noti => (noti.title && noti.description) === (noticia.title && noticia.description) );

    if(existe) {
      return true;
    } 
    return false;
  }
  
}
