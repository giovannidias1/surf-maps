import { Component } from '@angular/core';
import { MapsService } from './services/maps.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  template: `
    <div class="container">
      <h1>Surf Maps Search</h1>
      <mat-form-field appearance="fill">
        <mat-label>Buscar mapa</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="searchTerm"
          (ngModelChange)="filterMaps()"
          placeholder="Digite o nome do mapa"
        />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Filtrar por Tier</mat-label>
        <mat-select [(ngModel)]="selectedTier" (selectionChange)="filterMaps()">
          <mat-option value="">Todos</mat-option>
          <mat-option *ngFor="let tier of tiers" [value]="tier">
            Tier {{ tier }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <!-- Exibição dos mapas paginados -->
      <div class="map-cards">
        <mat-card *ngFor="let map of paginatedMaps" class="map-card">
          <mat-card-title>{{ map.mapname }}</mat-card-title>
          <mat-card-content>
            <p>Tier: {{ map.tier }}</p>
            <p>Mapper: {{ map.mapper }}</p>
            <p>Max Velocity: {{ map.maxvelocity }}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Paginator -->
      <mat-paginator
        [length]="filteredMaps.length"
        [pageSize]="20"
        [pageSizeOptions]="[10, 20, 50]"
        (page)="onPageChange($event)"
      >
      </mat-paginator>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 20px;
      }
      .map-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        margin-bottom: 20px;
      }
      .map-card {
        width: 300px;
      }
      mat-form-field {
        width: 100%;
        max-width: 300px;
        margin-right: 20px;
      }
      h1 {
        margin-bottom: 20px;
      }
      mat-paginator {
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class AppComponent {
  maps: any[] = [];
  filteredMaps: any[] = [];
  paginatedMaps: any[] = [];
  searchTerm: string = '';
  selectedTier: string = '';
  tiers: number[] = [];
  pageSize: number = 20;
  currentPage: number = 0;

  constructor(private mapsService: MapsService) {}

  ngOnInit() {
    this.mapsService.getMaps().subscribe((data) => {
      this.maps = data;
      this.tiers = [...new Set(this.maps.map((map) => map.tier))].sort();
      this.filterMaps();
    });
  }

  filterMaps() {
    this.filteredMaps = this.maps.filter((map) => {
      const matchesName = map.mapname
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesTier = this.selectedTier
        ? map.tier == this.selectedTier
        : true;
      return matchesName && matchesTier;
    });
    this.currentPage = 0;
    this.updatePaginatedMaps();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedMaps();
  }

  updatePaginatedMaps() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMaps = this.filteredMaps.slice(startIndex, endIndex);
  }
}
