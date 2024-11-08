import { Component } from '@angular/core';
import { MarcaService } from '../services/marca.service';
import { Marca } from '../models/marca';
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
  selector: 'app-marca',
  standalone: true,
  imports: [TableModule, ToastModule, FormsModule, DialogModule, ButtonModule, 
    InputTextModule, ConfirmDialogModule, DropdownModule, CommonModule, NavegarComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent {
  totalRecords: number = 0;
  cargando: boolean = false;
  marcas: Marca[] = [];
  titulo: string = '';
  opc: string = '';
  marca = new Marca(0, '');
  op = 0;
  visible: boolean = false;
  nombreTemp: string = '';
  isDeleteInProgress: boolean = false;
  filtroNombre: string = '';

  constructor(
    private marcaService: MarcaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.listarMarcas();
  }

  listarMarcas() {
    this.marcaService.getMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
        this.totalRecords = data.length;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de marcas',
        });
      },
    });
  }

  filtrarMarcas() {
    if (this.filtroNombre) {
      return this.marcas.filter(marca =>
        marca.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
    return this.marcas;
  }

  showDialogCreate() {
    this.titulo = 'Crear Marca';
    this.opc = 'Agregar';
    this.op = 0;
    this.nombreTemp = '';
    this.visible = true;
    this.marca = new Marca(0, '');
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Marca';
    this.opc = 'Editar';
    this.marcaService.getMarcaById(id).subscribe((data) => {
      this.marca = data;
      this.nombreTemp = this.marca.nombre;
      this.op = 1;
      this.visible = true;
    });
  }

  deleteMarca(id: number) {
    this.marcaService.deleteMarca(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Marca eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarMarcas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la marca',
        });
      },
    });
  }

  addMarca(): void {
    if (!this.nombreTemp || this.nombreTemp.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre es obligatorio',
      });
      return;
    }

    this.marca.nombre = this.nombreTemp;
    console.log('Marca a insertar:', this.marca);
    
    this.marcaService.createMarca(this.marca).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Marca registrada',
        });
        this.listarMarcas();
        this.op = 0;
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la marca',
        });
      },
    });
  }

  editMarca() {
    if (!this.nombreTemp || this.nombreTemp.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre es obligatorio',
      });
      return;
    }

    this.marca.nombre = this.nombreTemp;

    this.marcaService.updateMarca(this.marca, this.marca.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Marca actualizada',
        });
        this.listarMarcas();
        this.op = 0;
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la marca',
        });
      },
    });
  }

  opcion(): void {
    if (this.op == 0) {
      this.addMarca();
      this.limpiar();
    } else if (this.op == 1) {
      this.editMarca();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.nombreTemp = '';
    this.visible = false;
    this.marca = new Marca(0, '');
  }
}
