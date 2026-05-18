import { ReclamationService } from '@/app/services/reclamation.service';
import { selectToken } from '@/store/auth';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-recalamation',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-recalamation.component.html',
  styleUrl: './add-recalamation.component.scss'
})
export class AddReclamationComponent {

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
  ) { }

  ngOnInit(): void {

    this.initForm();

    this.store.select(selectToken).subscribe((token: any) => {

      if (token) {

        this.httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        // edit mode
        this.reclamationId = this.route.snapshot.paramMap.get('id')!;

        if (this.reclamationId) {
          this.isEditMode = true;
          this.loadReclamation();
        }
      }
    });
  }

  initForm() {

    this.reclamationForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [1, Validators.required],
      status: [0, Validators.required]
    });

  }

  loadReclamation() {

    this.reclamationService.getById(
      this.reclamationId,
      this.httpHeaders
    ).subscribe({

      next: (data: any) => {

        this.reclamationForm.patchValue({
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status
        });

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  onFilesSelected(event: any) {

    if (event.target.files) {

      this.selectedFiles = Array.from(event.target.files);

    }

  }

  onSubmit() {

    if (this.reclamationForm.invalid) return;

    this.loading = true;

    const values = this.reclamationForm.value;

    const reclamation = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status
    };

    const formData = new FormData();

    // IMPORTANT:
    // backend expects "reclamation"
    formData.append(
      'reclamation',
      new Blob(
        [JSON.stringify(reclamation)],
        { type: 'application/json' }
      )
    );

    // append files
    this.selectedFiles.forEach((file) => {
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

          this.reclamationForm.reset({
            priority: 1,
            status: 0
          });

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