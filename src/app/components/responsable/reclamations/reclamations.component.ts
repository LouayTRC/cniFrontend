import { Reclamation } from '@/app/entities/reclamation';
import { PriorityPipe } from '@/app/pipes/priority.pipe';
import { StatusPipe } from '@/app/pipes/status.pipe';
import { ReclamationService } from '@/app/services/reclamation.service';
import { selectToken } from '@/store/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reclamations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgApexchartsModule,
    PriorityPipe,
    StatusPipe
  ],
  templateUrl: './reclamations.component.html',
  styleUrl: './reclamations.component.scss'
})
export class ReclamationsComponent {

  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = [];

  store = inject(Store);
  router = inject(Router);
  toastr = inject(ToastrService);

  searchText: string = '';
  token: string = '';

  loading: boolean = false;
  processingId: string | null = null;

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.loading = true;

    this.store.select(selectToken).subscribe({
      next: (token) => {
        if (!token) return;

        this.token = token;

        this.reclamationService.getAllReclamations(this.getHeaders())
          .subscribe({
            next: (res: Reclamation[]) => {
              this.reclamations = res;
              this.filteredReclamations = res;
              this.loading = false;
            },
            error: () => {
              this.loading = false;
              this.toastr.error("Erreur chargement réclamations", "Erreur");
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
    this.filteredReclamations = this.reclamations.filter(r =>
      r.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      r.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // =========================
  // CHANGE STATUS (NEW)
  // =========================
  changeReclamationStatus(id: string, status: number) {

    this.processingId = id;

    this.reclamationService.changeReclamationStatus(id, status, this.getHeaders())
      .subscribe({

        next: () => {

          const updated = this.reclamations.map(r => {
            if (r.id === id) {
              return { ...r, status };
            }
            return r;
          });

          this.reclamations = updated;
          this.filteredReclamations = updated;

          this.processingId = null;

          this.toastr.success(
            status === 1 ? "Réclamation validée" : "Réclamation rejetée",
            "Succès"
          );
        },

        error: () => {
          this.processingId = null;
          this.toastr.error("Erreur lors de la mise à jour", "Erreur");
        }
      });
  }
}