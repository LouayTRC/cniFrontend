import { User } from '@/app/entities/user';
import { RoleService } from '@/app/services/role.service';
import { UserService } from '@/app/services/user.service';
import { selectToken } from '@/store/auth';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from "@component/reusables/popup/popup.component";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PopupComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {

  users: User[] = [];
  roles: any[] = [];

  store = inject(Store);
  router = inject(Router);
  toastr = inject(ToastrService);

  userSearch: string = "";
  token: string = "";

  loading: boolean = false;
  deletingId: string | null = null;

  // ✅ popup state
  showPopup: boolean = false;
  selectedUserId: string | null = null;

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectToken).subscribe(token => {
      if (token) {
        this.token = token;
        this.fetchUsers();
        this.fetchRoles();
      }
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
  }

  // ================= USERS =================
  private fetchUsers(): void {
    this.loading = true;

    this.userService.getAllUsers(this.getHeaders()).subscribe({
      next: (res: User[]) => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        this.toastr.error("Erreur chargement utilisateurs");
        this.loading = false;
      }
    });
  }

  // ================= ROLES =================
  private fetchRoles(): void {
    this.roleService.getAllRolesWithCountUser(this.getHeaders()).subscribe({
      next: (res: any[]) => this.roles = res,
      error: () => this.toastr.error("Erreur chargement rôles")
    });
  }

  goToUpdate(id: string) {
    this.router.navigate(['/admin/edit-user/' + id]);
  }

  // ================= POPUP =================
  openDeletePopup(id: string) {
    this.selectedUserId = id;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedUserId = null;
  }

  // ================= CONFIRM DELETE =================
  confirmDelete() {

    if (!this.selectedUserId) return;

    const id = this.selectedUserId;
    this.deletingId = id;

    this.userService.deleteUser(id, this.getHeaders()).subscribe({
      next: () => {

        const deletedUser = this.users.find(u => u.id === id);
        this.users = this.users.filter(u => u.id !== id);

        if (deletedUser?.role?.name) {
          const role = this.roles.find(r => r.name === deletedUser.role.name);
          if (role && role.countUsers > 0) {
            role.countUsers--;
          }
        }

        this.toastr.success("Utilisateur supprimé avec succès", "Success");

        this.deletingId = null;
        this.closePopup();
      },
      error: () => {
        this.deletingId = null;
        this.toastr.error("Échec de suppression utilisateur", "Erreur");
      }
    });
  }
}