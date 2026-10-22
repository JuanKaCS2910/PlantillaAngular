import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../model/categoria';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-categoria-list',
  imports: [TableModule, IconFieldModule, InputIconModule,
            InputTextModule, RatingModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.scss',
})

export class CategoriaListComponent {
    private categoryService = inject(CategoriaService);
    public categorias = signal<Categoria[]>([]);

    products = signal<any[]>([]);           // luego: signal<Categoria[]>

    selectedProducts: any[] = [];           // luego: Categoria[]

    cols: Column[] = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'rating', header: 'Reviews' },
        { field: 'inventoryStatus', header: 'Status' }
    ];

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.categoryService.getAll().subscribe({
            next: (res) => {
                console.log(res);
                this.categorias.set(res.datos.items);
                // this.categories.set(res);
                // this.startItem.set(0);
                // this.endItem.set(this.itemsPerPage);
            },
            error: (err) => {
                //this.toastr.error('Error al listar las categorías', 'Error');
            },
            complete() {}
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    editProduct(product: any) {
        // luego: abrir diálogo de edición
    }

    deleteProduct(product: any) {
        // luego: confirmar y eliminar
    }

}
