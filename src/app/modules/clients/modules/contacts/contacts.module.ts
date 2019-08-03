import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
    imports: [
        CommonModule,
        ContactsRoutingModule
    ],
    declarations: [
        ContactsComponent
    ]
})
export class ContactsModule { }
