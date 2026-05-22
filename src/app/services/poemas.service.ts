import { Injectable } from '@angular/core';

import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js';

import { environment }
  from '../../environments/environment';

export interface Poema {

  id?: number;

  titulo: string;

  autor: string;

  genero?: string;

  fecha?: string;

  contenido: string;

  imagen_url?: string;

}

@Injectable({
  providedIn: 'root'
})

export class PoemasService {

  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

  }

  // =========================
  // LISTAR
  // =========================

  async listar() {

    const { data, error } =
      await this.supabase
        .from('poemas')
        .select('*')
        .order('id', {
          ascending: false
        });

    if (error) throw error;

    return data as Poema[];

  }

  // =========================
  // OBTENER POR ID
  // =========================

  async obtenerPorId(id: number) {

    const { data, error } =
      await this.supabase
        .from('poemas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;

    return data as Poema;

  }

  // =========================
  // CREAR
  // =========================

  async crear(poema: Poema) {

    const { data, error } =
      await this.supabase
        .from('poemas')
        .insert(poema)
        .select();

    if (error) throw error;

    return data;

  }

  // =========================
  // ACTUALIZAR
  // =========================

  async actualizar(
    id: number,
    poema: Poema
  ) {

    const { data, error } =
      await this.supabase
        .from('poemas')
        .update(poema)
        .eq('id', id)
        .select();

    if (error) throw error;

    return data;

  }

  // =========================
  // ELIMINAR
  // =========================

  async eliminar(id: number) {

    const { error } =
      await this.supabase
        .from('poemas')
        .delete()
        .eq('id', id);

    if (error) throw error;

  }

  // =========================
  // SUBIR IMAGEN
  // =========================

  async subirImagen(file: File) {

    // nombre único

    const nombreArchivo =
      `${Date.now()}-${file.name}`;

    // subir al storage

    const { error } =
      await this.supabase.storage
        .from('imagenes')
        .upload(
          nombreArchivo,
          file
        );

    if (error) throw error;

    // obtener URL pública

    const { data } =
      this.supabase.storage
        .from('imagenes')
        .getPublicUrl(
          nombreArchivo
        );

    // devolver URL

    return data.publicUrl;

  }

}