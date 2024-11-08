import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-navegar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navegar.component.html',
  styleUrl: './navegar.component.css'
})
export class NavegarComponent {
  @Input() ubicacionActual: string = '';
}
