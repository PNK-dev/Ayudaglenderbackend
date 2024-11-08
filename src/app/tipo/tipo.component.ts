import { Component } from '@angular/core';
import { TipoService } from '../services/tipo.service';
import { Tipo } from '../models/tipo';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { NavegarComponent } from '../component/navegar/navegar.component';

@Component({
  selector: 'app-tipo',
  standalone: true,
  imports: [TableModule, ToastModule, FormsModule, DialogModule, ButtonModule, 
    InputTextModule, ConfirmDialogModule, DropdownModule, CommonModule, NavegarComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.css'
})
export class TipoComponent {
  totalRecords: number = 0;
  cargando: boolean = false;
  tipos: Tipo[] = [];
  titulo: string = '';
  opc: string = '';
  tipo = new Tipo(0, '');
  op = 0;
  visible: boolean = false;
  nombreTemp: string = '';
  isDeleteInProgress: boolean = false;
  filtroNombre: string = '';

  constructor(
    private tipoService: TipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.listarTipos();
  }

  listarTipos() {
    this.tipoService.getTipos().subscribe({
      next: (data) => {
        this.tipos = data;
        this.totalRecords = data.length;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de tipos',
        });
      },
    });
  }

  filtrarTipos() {
    if (this.filtroNombre) {
      return this.tipos.filter(tipo =>
        tipo.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
    return this.tipos;
  }

  showDialogCreate() {
    this.titulo = 'Crear Tipo';
    this.opc = 'Agregar';
    this.op = 0;
    this.nombreTemp = '';
    this.visible = true;
    this.tipo = new Tipo(0, '');
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Tipo';
    this.opc = 'Editar';
    this.tipoService.getTipoById(id).subscribe((data) => {
      this.tipo = data;
      this.nombreTemp = this.tipo.nombre;
      this.op = 1;
      this.visible = true;
    });
  }

  deleteTipo(id: number) {
    this.tipoService.deleteTipo(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Tipo eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarTipos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el tipo',
        });
      },
    });
  }

  addTipo(): void {
    if (!this.nombreTemp || this.nombreTemp.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre es obligatorio',
      });
      return;
    }

    this.tipo.nombre = this.nombreTemp;
    
    this.tipoService.createTipo(this.tipo).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Tipo registrado',
        });
        this.listarTipos();
        this.op = 0;
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el tipo',
        });
      },
    });
  }

  editTipo() {
    if (!this.nombreTemp || this.nombreTemp.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre es obligatorio',
      });
      return;
    }

    this.tipo.nombre = this.nombreTemp;

    this.tipoService.updateTipo(this.tipo, this.tipo.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Tipo actualizado',
        });
        this.listarTipos();
        this.op = 0;
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el tipo',
        });
      },
    });
  }

  opcion(): void {
    if (this.op == 0) {
      this.addTipo();
      this.limpiar();
    } else if (this.op == 1) {
      this.editTipo();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.tipo = new Tipo(0, '');
    this.nombreTemp = '';
  }
}
