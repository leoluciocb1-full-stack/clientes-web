import { Routes } from '@angular/router';
import { CadastrarClientes } from './pages/cadastrar-clientes/cadastrar-clientes';
import { ConsultarClientes } from './pages/consultar-clientes/consultar-clientes';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'cadastrar-clientes', //rota
        component: CadastrarClientes //componente
    },
    {
        path: 'consultar-clientes', //rota
        component: ConsultarClientes //componente
    },
    {
        path: 'dashboard', //rota
        component: Dashboard //componente
    },
    {
        path: '', pathMatch: 'full', //raiz do projeto
        redirectTo: '/dashboard' ///redirecionamento
    }
];