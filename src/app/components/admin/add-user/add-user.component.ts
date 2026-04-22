import { RoleService } from '@/app/services/role.service';
import { UserService } from '@/app/services/user.service';
import { selectToken } from '@/store/auth';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  httpHeaders!: HttpHeaders;
  registerForm!: FormGroup;
  roles: any[] = [];

  isEditMode = false;
  userId!: string;
  loading = false;

  store = inject(Store);

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.store.select(selectToken).subscribe((token: any) => {
      if (token) {
        this.httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        this.loadRoles();

        // 👇 check edit mode
        this.userId = this.route.snapshot.paramMap.get('id')!;
        if (this.userId) {
          this.isEditMode = true;
          this.loadUser();
        }
      }
    });
  }

  initForm() {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: [''], // optional in update
      role: ['0', Validators.required]
    });
  }

  loadRoles() {
    this.roleService.getAllRoles(this.httpHeaders).subscribe({
      next: (data: any) => {
        // filter ADMIN here (cleaner)
        this.roles = data.filter((r: any) => r.name !== 'ADMIN');
      },
      error: (err) => {
        console.error('Error loading roles', err);
      }
    });
  }

  loadUser() {
    this.userService.getUserById(this.userId, this.httpHeaders).subscribe({
      next: (user: any) => {
        this.registerForm.patchValue({
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role?.id
        });
      },
      error: (err) => {
        console.error('Error loading user', err);
      }
    });
  }

  onSubmit() {
  if (this.registerForm.invalid) return;

  const payload = this.registerForm.value;
  this.loading = true;

  if (this.isEditMode) {

    this.userService.updateUser(this.userId, payload, this.httpHeaders).subscribe({
      next: () => {
        this.loading = false;

        this.toastr.success(
          'User updated successfully',
          'Success'
        );

        this.router.navigate(['/admin/users']);
      },

      error: (err) => {
        this.loading = false;

        this.toastr.error(
          err?.error?.message || 'Error updating user',
          'Error'
        );
      }
    });

  } else {

    this.userService.addUser(payload, this.httpHeaders).subscribe({
      next: () => {
        this.loading = false;

        this.toastr.success(
          'User created successfully',
          'Success'
        );

        this.registerForm.reset({ role: '0' });
      },

      error: (err) => {
        this.loading = false;

        this.toastr.error(
          err?.error?.message || 'Error creating user',
          'Error'
        );
      }
    });
  }
}


 
}