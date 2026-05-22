import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { addIcons } from 'ionicons';
import { trashOutline, cloudUploadOutline } from 'ionicons/icons';

const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey
);

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, SafeUrlPipe],
  templateUrl: './multimedia.page.html',
  styleUrls: ['./multimedia.page.scss'],
})
export class MultimediaPage implements OnInit {
  constructor() {
    addIcons({
      trashOutline,
      cloudUploadOutline
    });
  }
  items: any[] = [];

  // CREATE (NO TOCADO AUDIO)
  titulo = '';
  autor = '';
  video_url = '';   // ⭐ SOLO AGREGADO
  file: File | null = null;

  // UPDATE
  updateFile: File | null = null;

  ngOnInit() {
    this.getItems();
  }

  // 📌 READ
  async getItems() {
    const { data, error } = await supabase
      .from('multimedia_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error:', error.message);
      return;
    }

    this.items = data || [];
  }

  // 📌 SELECT FILE (CREATE AUDIO)
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  // 📌 SELECT FILE (UPDATE AUDIO)
  onUpdateFile(event: any) {
    this.updateFile = event.target.files[0];
  }

  // 📌 CREATE (AUDIO + VIDEO)
  async uploadAudio() {

    if (!this.file) return;

    let audioUrl = '';

    // 🔥 upload audio (NO CAMBIADO)
    const cleanName = this.file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9.\-_]/g, "_");

    const fileName = `${Date.now()}_${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from('audios')
      .upload(fileName, this.file);

    if (uploadError) {
      console.log(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from('audios')
      .getPublicUrl(fileName);

    audioUrl = data.publicUrl;

    // 🔥 INSERT DB (AQUÍ SOLO SE AGREGA VIDEO)
    const { error: dbError } = await supabase
      .from('multimedia_items')
      .insert({
        titulo: this.titulo,
        autor: this.autor,
        fecha: new Date().toISOString().split('T')[0],
        video_url: this.convertYoutube(this.video_url),
        audio_url: audioUrl
      });

    if (dbError) {
      console.log(dbError.message);
      return;
    }

    // reset
    this.titulo = '';
    this.autor = '';
    this.video_url = '';
    this.file = null;

    this.getItems();
  }

  // 📌 DELETE (NO TOCADO)
  async deleteItem(item: any) {

    const fileName = item.audio_url.split('/').pop();

    await supabase.storage
      .from('audios')
      .remove([fileName]);

    await supabase
      .from('multimedia_items')
      .delete()
      .eq('id', item.id);

    this.getItems();
  }

  // 📌 UPDATE AUDIO (NO TOCADO)
  async updateAudio(item: any) {

    if (!this.updateFile) return;

    const oldFile = item.audio_url.split('/').pop();

    await supabase.storage
      .from('audios')
      .remove([oldFile]);

    const cleanName = this.updateFile.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9.\-_]/g, "_");

    const fileName = `${Date.now()}_${cleanName}`;

    const { error } = await supabase.storage
      .from('audios')
      .upload(fileName, this.updateFile);

    if (error) {
      console.log(error.message);
      return;
    }

    const { data } = supabase.storage
      .from('audios')
      .getPublicUrl(fileName);

    await supabase
      .from('multimedia_items')
      .update({
        audio_url: data.publicUrl
      })
      .eq('id', item.id);

    this.updateFile = null;

    this.getItems();
  }

  convertYoutube(url: string) {

    if (!url) return '';

    // si ya está en embed
    if (url.includes('embed')) return url;

    let videoId = '';

    // 🔥 formato: https://www.youtube.com/watch?v=XXXX
    if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    }

    // 🔥 formato: https://youtu.be/XXXX
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }

    // 🔥 seguridad extra (por si pegan solo el ID)
    else {
      videoId = url;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }
}