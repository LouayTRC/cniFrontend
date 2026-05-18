import { Reclamation } from '@/app/entities/reclamation';
import { ReclamationService } from '@/app/services/reclamation.service';

import { selectToken } from '@/store/auth';

import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { PriorityPipe } from '@/app/pipes/priority.pipe';
import { StatusPipe } from '@/app/pipes/status.pipe';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { PopupComponent } from '@component/reusables/popup/popup.component';

import { NgApexchartsModule } from 'ng-apexcharts';

import { ChartOptions } from '@/app/utils/enums';

@Component({
  selector: 'app-operateur-reclamations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    PopupComponent,
    NgApexchartsModule,
    PriorityPipe,
    StatusPipe
  ],
  templateUrl: './operateur-reclamations.component.html',
  styleUrl: './operateur-reclamations.component.scss'
})
export class OperateurReclamationsComponent {

  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = [];

  store = inject(Store);
  router = inject(Router);
  toastr = inject(ToastrService);

  

  searchText: string = '';

  token: string = '';

  loading: boolean = false;

  deletingId: string | null = null;

  // POPUP
  showPopup: boolean = false;
  selectedReclamationId: string | null = null;

  // CHART
  pieChart: Partial<ChartOptions> = {
    chart: {
      height: 320,
      type: 'pie',
    },

    series: [],

    labels: [],

    colors: [
      "#f7b84b",
      "#1e84c4",
      "#47ad77",
      "#ed5565"
    ],

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
      offsetY: 7,
    },

    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },

          legend: {
            show: false,
          },
        },
      },
    ],
  };

  constructor(
    private reclamationService: ReclamationService
  ) { }

  ngOnInit(): void {

    this.loading = true;

    this.store.select(selectToken).subscribe({

      next: (token) => {

        if (!token) return;

        this.token = token;

        this.reclamationService
          .getMyReclamations(this.getHeaders())
          .subscribe({

            next: (res: Reclamation[]) => {

              this.reclamations = res;

              this.filteredReclamations = res;

              this.prepareStats();

              this.loading = false;
            },

            error: () => {

              this.loading = false;

              this.toastr.error(
                "Erreur chargement réclamations",
                "Erreur"
              );
            }
          });
      }
    });
  }

  private getHeaders(): HttpHeaders {

    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  searchReclamation() {

    this.filteredReclamations =
      this.reclamations.filter(r =>

        r.title.toLowerCase()
          .includes(this.searchText.toLowerCase())

        ||

        r.description.toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
  }

  goToUpdate(id: string) {

    this.router.navigate([
      '/operateur/reclamations/edit',
      id
    ]);
  }

  // ================= POPUP =================

  openDeletePopup(id: string) {

    this.selectedReclamationId = id;

    this.showPopup = true;
  }

  closePopup() {

    this.showPopup = false;

    this.selectedReclamationId = null;
  }

  // ================= DELETE =================

  confirmDelete() {

    if (!this.selectedReclamationId) return;

    const id = this.selectedReclamationId;

    this.deletingId = id;

    this.reclamationService
      .deleteReclamation(id, this.getHeaders())
      .subscribe({

        next: () => {

          this.reclamations =
            this.reclamations.filter(r => r.id !== id);

          this.filteredReclamations =
            this.filteredReclamations.filter(r => r.id !== id);

          this.prepareStats();

          this.toastr.success(
            "Réclamation supprimée avec succès",
            "Success"
          );

          this.deletingId = null;

          this.closePopup();
        },

        error: () => {

          this.deletingId = null;

          this.toastr.error(
            "Échec suppression réclamation",
            "Erreur"
          );

          this.loading=false
        }
      });
  }

  // ================= STATS =================

  prepareStats() {

    const pending =
      this.reclamations.filter(
        r => r.status === 0
      ).length;

    const inProgress =
      this.reclamations.filter(
        r => r.status === 1
      ).length;

    const resolved =
      this.reclamations.filter(
        r => r.status === 2
      ).length;

    const rejected =
      this.reclamations.filter(
        r => r.status === -1
      ).length;

    this.pieChart.series = [
      pending,
      inProgress,
      resolved,
      rejected
    ];

    this.pieChart.labels = [
      'Pending',
      'In Progress',
      'Resolved',
      'Rejected'
    ];

    return {
      totalReclamations: this.reclamations.length,

      pending,

      inProgress,

      resolved,

      rejected
    };
  }


  downloadFiles(reclamationId: string) {

    this.reclamationService.downloadAllFiles(
      reclamationId,
      this.getHeaders()
    ).subscribe({

      next: (blob: Blob) => {

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;

        a.download = 'reclamation-files.zip';

        a.click();

        window.URL.revokeObjectURL(url);

      },

      error: (err) => {

        console.error(err);

        this.toastr.error(
          'Error downloading files',
          'Error'
        );

      }

    });

  }
}