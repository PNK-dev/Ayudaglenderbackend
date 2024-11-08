import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegarComponent } from "./component/navegar/navegar.component";
import { MarcaComponent } from './marca/marca.component';
import { TipoComponent } from './tipo/tipo.component';
import { CocheComponent } from './coche/coche.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarcaComponent, TipoComponent, CocheComponent, NavegarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'examenrecu2';
}
