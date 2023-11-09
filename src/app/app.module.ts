import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameInfoComponent } from './game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule } from '@angular/fire/firestore';

// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { AngularFireModule } from '@angular/fire';
// import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FirestoreModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-4772b',
        appId: '1:439313067025:web:2e7205d00d38642cecd5b0',
        storageBucket: 'ring-of-fire-4772b.appspot.com',
        apiKey: 'AIzaSyDx4ug-CNVDnpVswb7O93nC-YprSSXTjXc',
        authDomain: 'ring-of-fire-4772b.firebaseapp.com',
        messagingSenderId: '439313067025',
      })
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
