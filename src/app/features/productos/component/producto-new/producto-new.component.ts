import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Producto, ProductoRequest } from '../../model/producto';
import { NotificationService } from '@/app/shared/services/notification.service';
import { ProductoService } from '../../service/producto.service';
import { CategoriaService } from '@/app/features/categorias/service/categoria.service';
import { Categoria } from '@/app/features/categorias/model/categoria';
import { SelectModule } from 'primeng/select';
import { MarcaService } from '@/app/features/marcas/service/marca.service';
import { Marca } from '@/app/features/marcas/model/marca';
import { FileSelectEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-producto-new',
  imports: [DialogModule, ButtonModule, InputTextModule,
            CheckboxModule, FormsModule, CommonModule, SelectModule, FileUploadModule ],
  templateUrl: './producto-new.component.html',
  styleUrl: './producto-new.component.scss',
})
export class ProductoNewComponent {
    visible = model(false);
    saved = output<void>();
    producto: Partial<Producto> = { nombre: '', activo: true };
    submitted = false;
    editData = input<Producto | null>(null);
    categorias = signal<Categoria[]>([]);
    marcas = signal<Marca[]>([]);

    private productoService = inject(ProductoService);
    private notification = inject(NotificationService);
    private categoriaService = inject(CategoriaService);
    private marcaService = inject(MarcaService);
    selectedFile: File | null = null;
    imagenPreview: string | null = null;

    ngOnInit() {
        this.categoriaService.getAll().subscribe({
            next: (res) => this.categorias.set(res.datos.items)
        });
        this.marcaService.getAll().subscribe({
            next: (res) => this.marcas.set(res.datos.items)
        });
    }

    constructor() {
        effect(() => {
            const d = this.editData();
            this.producto = d
                ? { idProducto:d.idProducto, idCategoria: d.idCategoria, idMarca: d.idMarca, nombre: d.nombre,
                    activo: d.activo, descripcion: d.descripcion, precio: d.precio,
                    stock: d.stock, imagenUrl: d.imagenUrl }
                : { idProducto:0, idCategoria: 0, idMarca:0, nombre: '', activo: true, descripcion:'',
                    precio:0, stock: 0, imagenUrl:''
                 };
        });
    }

    hideDialog() {
        this.visible.set(false);
        this.submitted = false;
        this.selectedFile = null;
        this.imagenPreview = null;
    }

    onSelectImage(event: FileSelectEvent) {
        const file = event.files[0];
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            this.producto.imagenUrl = reader.result as string;
            this.imagenPreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    saveProducto() {
        if (!this.producto.nombre?.trim() || !this.producto.idCategoria) return;

                this.submitted = true;

                const request: ProductoRequest = {
                    idProducto: this.producto.idProducto,
                    idCategoria: this.producto.idCategoria,
                    idMarca: this.producto.idMarca,
                    nombre: this.producto.nombre,
                    descripcion: this.producto.descripcion,
                    precio: this.producto.precio,
                    stock: this.producto.stock,
                    imagenUrl: this.producto.imagenUrl,
                    activo: this.producto.activo ?? true,

                };

                console.log("idProducto: " + this.producto.idProducto)
                console.log("imagenPreview: " + this.imagenPreview)
                console.log('request:', request);

                const op$ = this.esEdicion
                ? this.productoService.update(this.producto.idProducto!, request)
                : this.productoService.save(request);

                op$.subscribe({
                    next: (resp) => {
                        if (resp.exito) {
                            this.notification.success(resp.mensaje);
                            this.saved.emit();
                            this.hideDialog();
                            this.producto = { nombre: '', activo: true };
                        } else {
                            this.notification.error(resp.mensaje);
                        }
                    },
                    error: () => this.notification.error('No se pudo guardar el producto')
                });

            }

    get esEdicion() { return !!this.producto.idProducto; }
}
