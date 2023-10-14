// // import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { MessageDetailsComponent } from './MessageDetailsComponent';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireModule } from '@angular/fire';
// import { MessagingDetailsService } from '../MessagesDetails/MessageDetailsServices';
// import { environment } from '../../../environments/environment';
// import { AsyncPipe } from '../../../../node_modules/@angular/common';
// import { CommonModule } from '@angular/common';
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// // export const MessageRouts = [
// //   { path: "messagedetails", component: MessageDetailsComponent }
// // ];

// @NgModule({
//    declarations: [MessageDetailsComponent],
//    imports: [
//     CommonModule,
//     FormsModule, ReactiveFormsModule,
//      NgbModule,
//       RouterModule,
//       // BrowserModule,
//       AngularFireDatabaseModule,
//       AngularFireAuthModule,
//       AngularFireMessagingModule,
//       AngularFireModule.initializeApp(environment.firebase),
//    ],
//    providers: [MessagingDetailsService,AsyncPipe],
//    bootstrap: [MessageDetailsComponent]
// })
// export class MessageDetailsModule  { }