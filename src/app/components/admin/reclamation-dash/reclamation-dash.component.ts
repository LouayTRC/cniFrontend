import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { selectToken } from '@/store/auth/auth.selectors';
import { ReclamationService } from '@/app/services/reclamation.service';
import { PriorityPipe } from '@/app/pipes/priority.pipe';
import { StatusPipe } from '@/app/pipes/status.pipe';
import { ChartOptions } from '@/app/utils/enums';

@Component({
  selector: 'app-reclamation-dash',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    PriorityPipe,
    StatusPipe
  ],
  templateUrl: './reclamation-dash.component.html',
  styleUrl: './reclamation-dash.component.scss'
})
export class ReclamationDashComponent {

  reclamations: any[] = [];
  filteredReclamations: any[] = [];
  searchText = '';
  loading = false;
  token = '';

  store = inject(Store);
  toastr = inject(ToastrService);

  constructor(private reclamationService: ReclamationService) {}

  // ================= PIE → CATEGORIES =================
  categoryChart: Partial<ChartOptions> = {
    chart: {
      type: 'pie',
      height: 320
    },
    series: [] as any,
    labels: [],
    colors: [
      '#3b82f6',
      '#22c55e',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
      '#14b8a6',
      '#f97316'
    ]
  };

  // ================= BAR → STATUS =================
  statusChart: Partial<ChartOptions> = {
    chart: {
      type: 'bar',
      height: 320
    },
    series: [
      {
        name: 'Réclamations',
        data: [] as any
      }
    ],
    xaxis: {
      categories: ['En attente', 'Validées', 'Rejetées']
    },
    colors: ['#6366f1']
  };

  // ================= INIT =================
  ngOnInit(): void {

    this.loading = true;

    this.store.select(selectToken).pipe(
      switchMap(token => {
        if (!token) return [];
        this.token = token;
        return this.reclamationService.getAllReclamations(this.getHeaders());
      })
    ).subscribe({
      next: (data: any) => {

        this.reclamations = data;
        this.filteredReclamations = data;

        this.prepareCharts();

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error("Erreur chargement réclamations");
      }
    });
  }

  // ================= HEADERS =================
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  // ================= SEARCH =================
  searchReclamation() {
    this.filteredReclamations = this.reclamations.filter(r =>
      r.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      r.description?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // ================= CHARTS =================
  prepareCharts() {

    // ===== PIE (CATEGORIES) =====
    const grouped: Record<string, number> = {};

    this.reclamations.forEach(r => {
      const cat = r.category || 'AUTRE';
      grouped[cat] = (grouped[cat] || 0) + 1;
    });

    this.categoryChart.series = Object.values(grouped);
    this.categoryChart.labels = Object.keys(grouped);

    // ===== BAR (STATUS) =====
    const pending = this.reclamations.filter(r => r.status === 0).length;
    const validated = this.reclamations.filter(r => r.status === 1).length;
    const rejected = this.reclamations.filter(r => r.status === -1).length;

    this.statusChart.series = [
      {
        name: 'Réclamations',
        data: [pending, validated, rejected]
      }
    ];
  }
}