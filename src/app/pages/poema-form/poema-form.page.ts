import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/angular/standalone';

import {
  PoemasService,
  Poema
} from '../../services/poemas.service';

@Component({
  selector: 'app-poema-form',
  templateUrl: './poema-form.page.html',
  styleUrls: ['./poema-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,

    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton
  ]
})

export class PoemaFormPage implements OnInit {

  id?: number;

  archivoImagen?: File;

  poema: Poema = {

    titulo: '',

    autor: '',

    genero: '',

    fecha: '',

    contenido: '',

    imagen_url: ''

  };

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private poemasService: PoemasService

  ) { }

  async ngOnInit() {

    const idParam =
      this.route.snapshot.paramMap.get('id');

    if (idParam) {

      this.id = Number(idParam);

      const poemaEncontrado =
        await this.poemasService
          .obtenerPorId(this.id);

      if (poemaEncontrado) {

        this.poema =
          poemaEncontrado;

      }

    }

  }

  seleccionarImagen(event: any) {

    const archivo =
      event.target.files[0];

    if (archivo) {

      this.archivoImagen =
        archivo;

    }

  }

  async guardar() {

    try {

      // SUBIR IMAGEN AL STORAGE

      if (this.archivoImagen) {

        const urlImagen =
          await this.poemasService
            .subirImagen(
              this.archivoImagen
            );

        this.poema.imagen_url =
          urlImagen;

      }

      // VALIDAR FECHA

      if (
        this.poema.fecha === ''
      ) {

        delete this.poema.fecha;

      }

      // EDITAR

      if (this.id) {

        await this.poemasService
          .actualizar(
            this.id,
            this.poema
          );

      }

      // CREAR

      else {

        await this.poemasService
          .crear(
            this.poema
          );

      }

      // REDIRECCIONAR

      this.router.navigate([
        '/tabs/poemas'
      ]);

    } catch (error) {

      console.error(
        'Error guardando poema',
        error
      );

    }

  }

}