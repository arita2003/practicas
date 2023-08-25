import { Component,ElementRef, ViewChildren,ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController, AnimationController,GestureController, IonCard } from '@ionic/angular';
import type {Animation, Gesture, GestureDetail} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class ExampleComponent {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement>;

  private animation: Animation;
  private gesture: Gesture;
  private started = false;
  private initialStep = 0;

  /**
   * The track is 344px wide.
   * The card is 100px wide.
   * We want 16px of margin on each end of the track.
   */
  private readonly MAX_TRANSLATE = 344 - 100 - 32;

  constructor(private animationCtrl: AnimationController, private gestureCtrl: GestureController) {}

  private onMove(ev: GestureDetail) {
    if (!this.started) {
      this.animation.progressStart();
      this.started = true;
    }

    this.animation.progressStep(this.getStep(ev));
  }

  private onEnd(ev: GestureDetail) {
    if (!this.started) {
      return;
    }

    this.gesture.enable(false);

    const step = this.getStep(ev);
    const shouldComplete = step > 0.5;

    this.animation.progressEnd(shouldComplete ? 1 : 0, step).onFinish(() => {
      this.gesture.enable(true);
    });

    this.initialStep = shouldComplete ? this.MAX_TRANSLATE : 0;
    this.started = false;
  }

  private clamp(min: number, n: number, max: number) {
    return Math.max(min, Math.min(n, max));
  }

  private getStep(ev: GestureDetail) {
    const delta = this.initialStep + ev.deltaX;
    return this.clamp(0, delta / this.MAX_TRANSLATE, 1);
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateX(0)', `translateX(${this.MAX_TRANSLATE}px)`);

    const gesture = (this.gesture = this.gestureCtrl.create({
      el: this.card.nativeElement,
      threshold: 0,
      gestureName: 'card-drag',
      onMove: (ev) => this.onMove(ev),
      onEnd: (ev) => this.onEnd(ev),
    }));

    gesture.enable(true);
  }
}

export class HomePage {
  nombre: string ="Araceli";
  edad =20;
  user1: string = "";

  //   varible tipo arreglo
  lista : any =[
    {
      nombreU: "Camila",
      edadU: 22,
      direcionU: "pje.Asuncion"
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

//ionic generate page pages/pagina2