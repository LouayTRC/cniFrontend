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

  showPopup: boolean = false;
  selectedReclamationId: string | null = null;

  // ================= CATEGORY LABELS =================
  categoryLabels: Record<string, string> = {
    REVOCATION: 'Révocation (Sécurité)',
    PIN_RESET: 'Réinitialisation PIN',
    DIGITAL_ID: 'Identité numérique',
    PHONE_CHANGE: 'Changement de téléphone',
    REQUEST_UPDATE: 'Mise à jour profil',
    OTHER: 'Autre'
  };

  constructor(private reclamationService: ReclamationService) {}

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
              this.toastr.error("Erreur chargement réclamations", "Erreur");
            }
          });
      }
    });
  }

  // ================= CATEGORY HELPER =================
  getCategoryLabel(category: string): string {
    return this.categoryLabels[category] || category;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  searchReclamation() {
    this.filteredReclamations =
      this.reclamations.filter(r =>
        r.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        r.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
  }

  goToUpdate(id: string) {
    this.router.navigate(['/operateur/reclamations/edit', id]);
  }

  openDeletePopup(id: string) {
    this.selectedReclamationId = id;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedReclamationId = null;
  }

  confirmDelete() {

    if (!this.selectedReclamationId) return;

    const id = this.selectedReclamationId;

    this.deletingId = id;

    this.reclamationService
      .deleteReclamation(id, this.getHeaders())
      .subscribe({

        next: () => {
          this.reclamations = this.reclamations.filter(r => r.id !== id);
          this.filteredReclamations = this.filteredReclamations.filter(r => r.id !== id);
          this.prepareStats();

          this.toastr.success("Réclamation supprimée avec succès", "Success");

          this.deletingId = null;
          this.closePopup();
        },

        error: () => {
          this.deletingId = null;
          this.toastr.error("Échec suppression réclamation", "Erreur");
          this.loading = false;
        }
      });
  }

  prepareStats() {

    const pending = this.reclamations.filter(r => r.status === 0).length;
    const inProgress = this.reclamations.filter(r => r.status === 1).length;
    const resolved = this.reclamations.filter(r => r.status === 2).length;
    const rejected = this.reclamations.filter(r => r.status === -1).length;

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

      error: () => {
        this.toastr.error('Error downloading files', 'Error');
      }
    });
  }
}