import { Routes } from '@angular/router';
import { NavegarComponent } from './component/navegar/navegar.component';
import { TipoComponent } from './tipo/tipo.component';
import { MarcaComponent } from './marca/marca.component';
import { CocheComponent } from './coche/coche.component';

export const routes: Routes = [
    {
        path: 'tipo',
        component: TipoComponent,
        title: 'Tipo' 
    },
    {
        path: 'marca',
        component: MarcaComponent,
        title: 'Marca' 
    },
    {
        path: 'coche',
        component: CocheComponent,
        title: 'Coche' 
    },
    {
        path: '**',
        component: NavegarComponent,
        title: 'Navegar'
    }
];
