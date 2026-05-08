import { User } from '@/app/entities/user';
import { RoleService } from '@/app/services/role.service';
import { UserService } from '@/app/services/user.service';
import { selectToken } from '@/store/auth';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from "@component/reusables/popup/popup.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '@/app/utils/enums';
import { combineLatest, switchMap } from 'rxjs';


@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PopupComponent, NgApexchartsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {

  users: User[] = [];
  roles: any[] = [];

  store = inject(Store);
  router = inject(Router);
  toastr = inject(ToastrService);
  private titleCase = new TitleCasePipe();

  userSearch: string = "";
  token: string = "";

  loading: boolean = false;
  deletingId: string | null = null;

  // ✅ popup state
  showPopup: boolean = false;
  selectedUserId: string | null = null;


  pieChart: Partial<ChartOptions> = {
    chart: {
      height: 320,
      type: 'pie',
    },
    series: [],
    labels: [],
    colors: ["#1e84c4", "#7f56da", "#ed5565"],
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
    private userService: UserService,
    private roleService: RoleService
  ) { }



  ngOnInit(): void {
    this.store.select(selectToken).pipe(
      switchMap(token => {
        if (!token) return [];

        this.token = token;

        return combineLatest([
          this.userService.getAllUsers(this.getHeaders()),
          this.roleService.getAllRolesWithCountUser(this.getHeaders())
        ]);
      })
    ).subscribe({
      next: ([users, roles]: any) => {
        this.users = users;
        this.roles = roles;

        const stats = this.prepareStats();
        console.log("stats", stats); // ✅ maintenant fonctionne toujours
      },
      error: () => {
        this.toastr.error("Erreur chargement données");
      }
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
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


  prepareStats() {
    let stats: any = {
      totalUsers: this.users.length,
      totalRoles: this.roles.length,
      roles:this.roles.map(r=>({name:r.name,count:r.countUsers,pourcentage: this.users.length > 0 ? Math.round((r.countUsers / this.users.length) * 100) : 0}))
    }
    console.log("stats", stats);

    this.pieChart.series = stats.roles.map((r: any) => r.count);
    this.pieChart.labels = stats.roles.map((r: any) => this.titleCase.transform(r.name) );
    return stats;
  }
}