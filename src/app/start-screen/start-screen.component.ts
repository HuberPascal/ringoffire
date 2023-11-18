import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Game } from 'src/models/games';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  // db: Firestore;
  db = getFirestore();

  constructor(private router: Router, firestore: Firestore) {}

  ngOnInit(): void {}

  async newGame() {
    // Start Game
    let game = new Game();

    try {
      const gameData = game.toJson(); // JSON-Objekt von der Game-Klasse holen
      const docRef = await addDoc(collection(this.db, 'games'), gameData).then(
        (gameInfo: any) => {
          this.router.navigateByUrl('/game/' + gameInfo.id);
        }
      );
    } catch (error) {
      console.error('Fehler beim Schreiben der Dokumente (JSON):', error);
    }
  }
}
