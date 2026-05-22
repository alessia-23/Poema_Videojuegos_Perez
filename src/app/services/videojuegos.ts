import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Videojuego {
  id?: number;
  titulo: string;
  plataforma: string;
  precio: number;
  stock: number;
  categoria?: string;
  imagen_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async listar() {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data as Videojuego[];
  }

  async obtenerPorId(id: number) {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Videojuego;
  }

  async crear(videojuego: Videojuego) {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .insert(videojuego)
      .select();

    if (error) throw error;
    return data;
  }

  async actualizar(id: number, videojuego: Videojuego) {
    const { data, error } = await this.supabase
      .from('videojuegos')
      .update(videojuego)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async eliminar(id: number) {
    const { error } = await this.supabase
      .from('videojuegos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}