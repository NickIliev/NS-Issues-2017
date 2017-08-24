import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';

export const routes = [
  { 
    path: "",
    component: DashboardComponent, 
    pathMatch: "full", 
  },
  { 
    path: "search", 
    component: SearchComponent
  }
];