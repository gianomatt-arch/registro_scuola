import { computed, inject, Injectable, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly keycloak = inject(KeycloakService);
  private readonly tokenParsed = signal<Record<string, any> | null>(null);
  private readonly userProfile = signal<any>(null);

  constructor() {
    this.bootstrap();
  }

  readonly roles = computed(() => this.tokenParsed()?.realm_access?.roles ?? []);
  readonly profile = computed(() => this.userProfile());

  async bootstrap(): Promise<void> {
    this.tokenParsed.set(this.keycloak.getKeycloakInstance().tokenParsed ?? null);
    this.userProfile.set(await this.keycloak.loadUserProfile());
  }

  hasRole(role: string): boolean {
    return this.roles().includes(role);
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  logout(): void {
    this.keycloak.logout(window.location.origin);
  }
}
