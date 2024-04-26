import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'af-notification';
  message: any = null;
  token: any = null;

  constructor() {
  }

  ngOnInit(): void {
    this.requestPermission();
    this.listenForMessages();
  }

  requestPermission() {
    console.log('requesting permission');
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: environment.firebase.vapidKey}).then(token => {
        if (token) {
          this.token = token;
          console.log("token refreshed...", {token});
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  listenForMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    })
  }

  hiddenHandler() {
    this.message = null
  }
}
