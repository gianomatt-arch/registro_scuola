import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accesso-negato',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accesso-negato.component.html',
  styleUrl: './accesso-negato.component.css',
})
export class AccessoNegatoComponent {}
