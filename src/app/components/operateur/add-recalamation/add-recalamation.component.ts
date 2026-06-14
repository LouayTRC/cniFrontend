import { ReclamationService } from '@/app/services/reclamation.service';
import { selectToken } from '@/store/auth';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-recalamation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-recalamation.component.html',
  styleUrl: './add-recalamation.component.scss'
})
export class AddReclamationComponent implements OnInit {

  httpHeaders!: HttpHeaders;

  reclamationForm!: FormGroup;

  loading = false;

  isEditMode = false;
  reclamationId!: string;

  selectedFiles: File[] = [];

  store = inject(Store);

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ================= INIT =================
  ngOnInit(): void {

    this.initForm();

    this.store.select(selectToken).subscribe((token: any) => {

      if (token) {

        this.httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        this.reclamationId = this.route.snapshot.paramMap.get('id')!;

        if (this.reclamationId) {
          this.isEditMode = true;
          this.loadReclamation();
        }
      }
    });
  }

  // ================= FORM =================
  initForm() {

    this.reclamationForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  // ================= LOAD (EDIT MODE) =================
  loadReclamation() {

    this.reclamationService.getById(
      this.reclamationId,
      this.httpHeaders
    ).subscribe({

      next: (data: any) => {

        this.reclamationForm.patchValue({
          title: data.title,
          description: data.description
        });

      },

      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load reclamation');
      }

    });

  }

  // ================= FILES =================
  onFilesSelected(event: any) {

    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }

  }

  // ================= SUBMIT =================
  onSubmit() {

    if (this.reclamationForm.invalid) return;

    this.loading = true;

    // ONLY ML INPUT
    const payload = {
      title: this.reclamationForm.value.title,
      description: this.reclamationForm.value.description
    };

    const formData = new FormData();

    // backend expects "reclamation"
    formData.append(
      'reclamation',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );

    // files
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    // ================= UPDATE =================
    if (this.isEditMode) {

      this.reclamationService.updateReclamation(
        this.reclamationId,
        formData,
        this.httpHeaders
      ).subscribe({

        next: () => {

          this.loading = false;

          this.toastr.success(
            'Reclamation updated successfully',
            'Success'
          );

          this.router.navigate(['/admin/reclamations']);

        },

        error: (err) => {

          this.loading = false;

          this.toastr.error(
            err?.error?.message || 'Error updating reclamation',
            'Error'
          );

        }

      });

    }

    // ================= CREATE =================
    else {

      this.reclamationService.createReclamation(
        formData,
        this.httpHeaders
      ).subscribe({

        next: () => {

          this.loading = false;

          this.toastr.success(
            'Reclamation created successfully',
            'Success'
          );

          this.reclamationForm.reset();

          this.selectedFiles = [];

        },

        error: (err) => {

          this.loading = false;

          this.toastr.error(
            err?.error?.message || 'Error creating reclamation',
            'Error'
          );

        }

      });

    }

  }
}