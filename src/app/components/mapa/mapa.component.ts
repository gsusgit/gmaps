import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat = 37.899772;
  lng = -4.801546;
  zoom = 16;
  marcadores: Marcador[] = [];
  name = 'Jesus';

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.cargarLocalStorage();
  }

  ngOnInit(): void {
  }

  agregarMarcador(evento) {
    const lat = evento.coords.lat;
    const lng = evento.coords.lng;
    const marcador = new Marcador(lat, lng);
    this.marcadores.push(marcador);
    this.snackBar.open('Marcador añadido', 'Cerrar', {duration: 1000});
    this.guardarLocalStorage();
  }

  borrarMarcador(indice: number) {
    this.marcadores.splice(indice, 1);
    this.snackBar.open('Marcador borrado', 'Cerrar', {duration: 1000});
    this.guardarLocalStorage();
  }

  editarMarcador(marcador: Marcador): void {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {
        titulo: marcador.titulo,
        descripcion: marcador.descripcion
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) {
        return;
      }
      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;
      this.guardarLocalStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
    });
  }

  guardarLocalStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  cargarLocalStorage() {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

}
