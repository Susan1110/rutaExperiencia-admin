import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainRoutingModule } from '../main/main-routing.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MainRoutingModule],
  exports: [SidebarComponent],
})
export class SharedModule {}
