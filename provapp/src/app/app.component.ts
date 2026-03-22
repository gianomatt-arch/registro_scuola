import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly profile = this.authService.profile;
  readonly roles = this.authService.roles;

  logout(): void {
    this.authService.logout();
  }

  goHome(): void {
    const target = this.roles().includes('docente') ? '/docente' : '/studente';
    this.router.navigateByUrl(target);
  }
}
