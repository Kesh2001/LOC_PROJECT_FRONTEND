import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { PrimeIcons } from 'primeng/api';
import { MenuModule } from 'primeng/menu'; // Add MenuModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    MenuModule // Add MenuModule for p-menu
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  avatarMenuItems: MenuItem[] = []; // Dropdown items for the avatar

  ngOnInit() {
    // Menubar items (unchanged)
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
        style: { 'background-color': '#ffffff', 'color': '#35b233' }
      },
      {
        label: 'User Form',
        icon: PrimeIcons.ADDRESS_BOOK,
        routerLink: '/user-form',
        style: { 'background-color': '#ffffff', 'color': '#35b233' }
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        routerLink: '/home',
        style: { 'background-color': '#ffffff', 'color': '#35b233' },
        items: [
          { label: 'Components', icon: 'pi pi-bolt', style: { 'background-color': '#ffffff', 'color': '#35b233' } },
          { label: 'Blocks', icon: 'pi pi-server', style: { 'background-color': '#ffffff', 'color': '#35b233' } },
          { label: 'UI Kit', icon: 'pi pi-pencil', style: { 'background-color': '#ffffff', 'color': '#35b233' } },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            style: { 'background-color': '#ffffff', 'color': '#35b233' },
            items: [
              { label: 'Apollo', icon: 'pi pi-palette', style: { 'background-color': '#ffffff', 'color': '#35b233' } },
              { label: 'Ultima', icon: 'pi pi-palette', style: { 'background-color': '#ffffff', 'color': '#35b233' } }
            ]
          }
        ]
      },
      {
        label: 'Table ',
        icon: 'pi pi-envelope',
        routerLink: '/Table',
        style: { 'background-color': '#ffffff', 'color': '#35b233' }
      },
    ];

    // Avatar dropdown items (similar to Projects)
    this.avatarMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
      },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: '/login', style: { 'background-color': '#ffffff', 'color': '#35b233' } },
    

    ];
  }
}