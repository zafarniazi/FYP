import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { IntroductoryComponent } from './introductory/introductory.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: '',
  component : IntroductoryComponent
},
{path: "signup", component: SignupComponent},
{path: "signin", component: SigninComponent},
{path: "blogs", component: BlogpostComponent},
{
  path:"**",
  component:NotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
