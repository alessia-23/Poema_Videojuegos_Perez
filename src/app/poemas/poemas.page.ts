import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import {
  IonContent,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSearchbar
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  addOutline,
  createOutline,
  trashOutline,
  bookOutline
} from 'ionicons/icons';

import {
  PoemasService,
  Poema
} from '../services/poemas.service';

@Component({
  selector: 'app-poemas',
  templateUrl: './poemas.page.html',
  styleUrls: ['./poemas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonSearchbar
  ]
})
export class PoemasPage implements OnInit {

  listaPoemas: Poema[] = [];

  poemasOriginales: Poema[] = [];

  textoBuscar = '';

  cargando = true;

  constructor(
    private router: Router,
    private poemasService: PoemasService
  ) {

    addIcons({
      addOutline,
      createOutline,
      trashOutline,
      bookOutline
    });

  }

  async ngOnInit() {

    await this.cargarPoemas();

  }

  async cargarPoemas() {

    try {

      this.cargando = true;

      this.poemasOriginales =
        await this.poemasService.listar();

      this.listaPoemas =
        this.poemasOriginales;

    } catch (error) {

      console.error(
        'Error cargando poemas',
        error
      );

    } finally {

      this.cargando = false;

    }

  }

  buscarPoemas(event: any) {

    const texto =
      event.target.value
        ?.toLowerCase() || '';

    this.listaPoemas =
      this.poemasOriginales.filter(
        poema =>

          poema.autor
            .toLowerCase()
            .includes(texto)

      );

  }

  editarPoema(poema: Poema) {

    this.router.navigate([
      '/poema-form',
      poema.id
    ]);

  }

  async eliminarPoema(id: number | undefined) {

    if (!id) return;

    try {

      await this.poemasService.eliminar(id);

      await this.cargarPoemas();

    } catch (error) {

      console.error(
        'Error eliminando poema',
        error
      );

    }

  }

}