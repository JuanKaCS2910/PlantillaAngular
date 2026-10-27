import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../service/dashboard.service';
import { DashboardResumen } from '../model/layout';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule, RouterModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3 cursor-pointer" routerLink="/productos">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Productos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ resumen()?.productos?.total }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-box text-blue-500 text-xl!"></i>
                    </div>
                </div>
                <!-- <span class="text-primary font-medium">24 new </span>
                <span class="text-muted-color">since last visit</span> -->
                <span class="text-primary font-medium block">
                    <i class="pi pi-check-circle mr-1"></i>{{ resumen()?.productos?.activos }} activos
                </span>
                <span class="text-red-500 font-medium block">
                    <i class="pi pi-times-circle mr-1"></i>{{ resumen()?.productos?.inactivos }} inactivos
                </span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3 cursor-pointer" routerLink="/categorias">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Categoria</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ resumen()?.categorias?.total }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-tags text-orange-500 text-xl!"></i>
                    </div>
                </div>
                <!-- <span class="text-primary font-medium">%52+ </span>
                <span class="text-muted-color">since last week</span> -->
                <span class="text-primary font-medium block">
                    <i class="pi pi-check-circle mr-1"></i>{{ resumen()?.categorias?.activos }} activos
                </span>
                <span class="text-red-500 font-medium block">
                    <i class="pi pi-times-circle mr-1"></i>{{ resumen()?.categorias?.inactivos }} inactivos
                </span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3 cursor-pointer" routerLink="/marcas">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Marca</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ resumen()?.marcas?.total }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-verified text-cyan-500 text-xl!"></i>
                    </div>
                </div>
                <!-- <span class="text-primary font-medium">520 </span>
                <span class="text-muted-color">newly registered</span> -->
                <span class="text-primary font-medium block">
                    <i class="pi pi-check-circle mr-1"></i>{{ resumen()?.marcas?.activos }} activos
                </span>
                <span class="text-red-500 font-medium block">
                    <i class="pi pi-times-circle mr-1"></i>{{ resumen()?.marcas?.inactivos }} inactivos
                </span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3 cursor-pointer" routerLink="/usuarios">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Usuarios</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ resumen()?.usuarios?.total }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-purple-500 text-xl!"></i>
                    </div>
                </div>
                <!-- <span class="text-primary font-medium">85 </span>
                <span class="text-muted-color">responded</span> -->
                <span class="text-primary font-medium block">
                    <i class="pi pi-check-circle mr-1"></i>{{ resumen()?.usuarios?.activos }} activos
                </span>
                <span class="text-red-500 font-medium block">
                    <i class="pi pi-times-circle mr-1"></i>{{ resumen()?.usuarios?.inactivos }} inactivos
                </span>
            </div>
        </div>`
})
export class StatsWidget {
    private dashboardService = inject(DashboardService);

    resumen = signal<DashboardResumen | null>(null);

    ngOnInit() {
        this.dashboardService.getResumen().subscribe({
            next: (res) => {
                console.log(res);
                this.resumen.set(res.datos)
            }
        });
    }

}
