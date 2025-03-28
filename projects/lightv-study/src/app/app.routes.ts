import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { SigninPageComponent } from './pages/user/signin-page/signin-page.component';
import { ProfilePageComponent } from './pages/user/profile-page/profile-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', title: 'Home | LightV Study', component: HomePageComponent },
  {
    path: 'courses',
    title: 'Courses | LightV Study',
    component: CoursePageComponent,
  },
  {
    path: 'user',
    title: 'User | LightV Study',

    children: [
      {
        path: 'login',
        title: 'Login | LightV Study',
        component: SigninPageComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'user/me',
    title: 'Profile | LightV Study',
    component: ProfilePageComponent,
  },
  {
    path: '**',
    title: 'Page Not Found | LightV Study',
    component: NotfoundPageComponent,
  },
];
