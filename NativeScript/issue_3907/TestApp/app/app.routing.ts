import { TabBarComponent } from "./navigation/tab-bar.component";
import { MapComponent } from "./components/map/map.component"
import { RouteComponent } from './components/route/route.component'
import { NewsComponent } from './components/news/news.component'
import { SettingsComponent } from './components/settings/settings.component'
import { NotificationsComponent } from './components/settings/notifications/notifications.component'

export const routes = [
  { path: "", component: TabBarComponent },
  { path: "notifications", component: NotificationsComponent }
];

export const navigatableComponents = [
  TabBarComponent,
  MapComponent,
  RouteComponent,
  NewsComponent,
  SettingsComponent,
  NotificationsComponent
];