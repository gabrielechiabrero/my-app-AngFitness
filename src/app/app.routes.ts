import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CorsiComponent } from './corsi/corsi.component';

export const routes: Routes = [
    
    {path:'', component: HomeComponent},

    {path: 'corsi', component:CorsiComponent},

];
