import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomComponent } from './welcom/welcom.component';
import { authGuard } from './auth/auth.guard';
import { MainAppComponent } from './main-app/main-app.component';
import { DashboardComponent } from './main-app/dashboard/dashboard.component';
import { TransactionDetailsComponent } from './main-app/transaction/transaction-details/transaction-details.component';
import { TransactionListComponent } from './main-app/transaction/transaction-list/transaction-list.component';
import { TransactionWithdrawalComponent } from './main-app/transaction/transaction-withdrawal/transaction-withdrawal.component';
import { TransactionMaintenanceTaxComponent } from './main-app/transaction/transaction-maintenance-tax/transaction-maintenance-tax.component';

export const routes: Routes = [

    {
        // canActivate:[authGuard],
        path: 'app-admin',
        component: MainAppComponent,
        children: [
            {
                path: '', component: DashboardComponent,
                title: 'home'
            },
            {
                path: 'details-transaction',
                component: TransactionDetailsComponent,
                title: 'details'
            },
            {
                path: 'details-transaction/:id',
                component: TransactionDetailsComponent,
                title: 'details'
            },
            {
                path: 'model-details-transaction/:id',
                component: ModelDetailsTransactionComponent,
                title: 'Model-details'
            },
            {
                path: 'bank-statement/:id',
                component: BanckStatementComponent, 
                title: 'bank-stement'
            },
            
            {
                path: 'transactions',
                component: TransactionListComponent,
                title: 'transaction'
            },
            {
                path: 'deposit/:id',
                component: TransactionDetailsComponent,
                title: 'deposit'
            },
            {
                path: 'withdrawal/:id',
                component: TransactionWithdrawalComponent,
                title: 'withdrawal'
            },
            // {
            //     path: 'cheque/:id',
            //     component: Tra,
            //     title: 'cheque'
            // },
            {
                path: 'maintenance/:id',
                component: TransactionMaintenanceTaxComponent,
                title: 'maintenance'
            },
            
            {
                path: 'transfer/:id',
                component: TransferTransactionComponent,
                title: 'transfer'
            },
            {
                path: 'transactions/:id',
                component: EditTransactionComponent,
                title: 'transaction'
            },
            {
                path: 'customers',
                component: CustomerListComponent,
                title:'customers'
            },
            {
                path: 'add-customer',
                component: CustomerAddComponent,
                title:'add-customer'
            },
            {
                path:'account',
                component: ListBankaccountComponent,
                title: 'account'
            },
            {
                path:'add-account',
                component: AddBankaccountComponent,
                title: 'account'
            },
            {
                path:'add-account/:id',
                component: SaveBankaccountComponent,
                title: 'account'
            },
            {
                path:'edit-transaction/:id',
                component: EditTransactionComponent,
                title: 'edit-transaction'
            }
        ]
    },
    {
        path: "",
        redirectTo: "/welcom",
        pathMatch: 'full'
    },
    {
        canActivate:[authGuard],
        path: "welcom",
        component: WelcomComponent
    },

    // Authentication
    {
        path: 'login',
        component: LoginComponent,
        title: 'login',
    },
    // {
    //     path: 'register',
    //     component: RegisterComponent,
    //     title:'register'
    // },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent,
        title: 'page-not-found'
    },
    {
        path: '**',
        redirectTo: '/page-not-found'
    }
];
