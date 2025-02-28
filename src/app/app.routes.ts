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
import { TransactionEditComponent } from './main-app/transaction/transaction-edit/transaction-edit.component';
import { AccountAddComponent } from './main-app/account/account-add/account-add.component';
import { AccountListComponent } from './main-app/account/account-list/account-list.component';
import { CustomerAddComponent } from './main-app/customer/customer-add/customer-add.component';
import { CustomerListComponent } from './main-app/customer/customer-list/customer-list.component';
import { TransactionTranferOutComponent } from './main-app/transaction/transaction-tranfer-out/transaction-tranfer-out.component';
import { TransactionTranferInComponent } from './main-app/transaction/transaction-tranfer-in/transaction-tranfer-in.component';
import { TransactionToEditComponent } from './main-app/transaction/transaction-to-edit/transaction-to-edit.component';
import { BranchAddComponent } from './main-app/branch/branch-add/branch-add.component';
import { BranchListComponent } from './main-app/branch/branch-list/branch-list.component';
import { TransactionDepositComponent } from './main-app/transaction/transaction-deposit/transaction-deposit.component';

export const routes: Routes = [

    {
        canActivate:[authGuard],
        path: 'app',
        component: MainAppComponent,
        children: [
            {
                path: '', component: DashboardComponent,
                title: 'home'
            },
            // branch
            {
                path: 'add-branch',
                component: BranchAddComponent,
                title: 'save-branch'
            },
            {
                path: 'branch-list',
                component: BranchListComponent,
                title: 'branch-list'
            },
            // Transactions
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
                component: TransactionToEditComponent,
                title: 'Model-details'
            },
            
            {
                path: 'transactions',
                component: TransactionListComponent,
                title: 'transactions'
            },
            {
                path: 'deposit/:id',
                component: TransactionDepositComponent,
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
                path:'edit-transaction/:id',
                component: TransactionEditComponent,
                title: 'edit-transaction'
            },
            {
                path: 'transfer-out/:id',
                component: TransactionTranferOutComponent,
                title: 'transfer'
            },
            {
                path: 'transfer-in/:id',
                component: TransactionTranferInComponent,
                title: 'transfer'
            },
            {
                path: 'transactions/:id',
                component: TransactionEditComponent,
                title: 'transaction'
            },
            // customer
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
            // Account
            {
                path:'accounts',
                component: AccountListComponent,
                title: 'Account'
            },
            {
                path:'add-account',
                component: AccountAddComponent,
                title: 'account'
            },
            {
                path:'add-account/:id',
                component: AccountAddComponent,
                title: 'account'
            },
            
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
