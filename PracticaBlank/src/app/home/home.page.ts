import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  nombre: string ="Camila";
  edad = 22;
  user1: string = "";

  //   varible tipo arreglo
  lista : any =[
    {
      nombreU: "Araceli",
      edadU: 20,
      direcionU: "Calle San Luis"
    }
  ]

  constructor(private router:Router, private alertController: AlertController, private toastController: ToastController) {}
  
  //alerta una en todo el proyecto
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Mensaje Urgente',
      message: 'haz clik aqui!',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }


  //declarar metodo 
  sumar(){
    this.nombre; 
    console.log("Hola Mundo");
  }

  



  irPagina1(){
    let navigationExtras: NavigationExtras = {
      state: {
        nombreEnviado: this.nombre,
        edadEnviada: this.edad
      }
    }
    //this.presentAlert();
    this.presentToast('bottom');
    this.router.navigate(['/pagina1'], navigationExtras);
  }
  
}
