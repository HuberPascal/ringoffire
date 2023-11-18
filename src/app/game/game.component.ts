import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/games';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
  onSnapshot,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

const firebaseConfig = environment.firebaseConfig;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  gameId: string | undefined;

  items$;
  items;

  db = getFirestore();

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.items$ = collectionData(this.gameCollection());
    this.items = this.items$.subscribe((list) => {
      list.forEach((element) => {
        // console.log('test', element);
      });
    });
  }

  ngOnInit(): void {
    // this.addDocumentToFirebase();
    this.addDocumentToFirebaseAsJSON(); // Daten beim starten auf Firebase laden
    this.getDocumentFromFirebase();
    this.getDocumentsFromFirebaseStringify();

    // URL Parameter abonnieren von game/:id
    this.route.params.subscribe((params) => {
      console.log('die params sind', params['id']);
      this.gameId = params['id'];

      this.update(params, this.gameId);
    });
  }

  // Firebase daten in das Array im Spiel laden
  async update(params: any, gameId: any) {
    try {
      onSnapshot(doc(this.db, 'games', gameId), (doc) => {
        console.log('Current data: ', doc.data()?.['players']);

        this.game.players = doc.data()?.['players'];
        this.game.stack = doc.data()?.['stack'];
        this.game.playedCards = doc.data()?.['playedCards'];
        this.game.currentPlayer = doc.data()?.['currentPlayer'];
      });
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Daten:', error);
    }
  }

  // Daten in den Firebase schreiben
  async addDocumentToFirebase() {
    try {
      console.log('funktion wird ausgeführt');
      const docRef = await addDoc(collection(this.db, 'users'), {
        first: 'Max',
        last: 'Mustermann',
        born: 1990,
      });
      // console.log(`Added document with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Fehler beim schreiben der Dokumente:', error);
    }
  }

  // Daten in den Firebase schreiben von einem JSON objekt von games.ts (return)
  async addDocumentToFirebaseAsJSON() {
    this.game = new Game();
    try {
      const gameData = this.game.toJson(); // Holen Sie sich das JSON-Objekt von der Game-Klasse
      const docRef = await addDoc(collection(this.db, 'games'), gameData);
      // console.log(`Added JSON document with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Fehler beim Schreiben der Dokumente (JSON):', error);
    }
  }

  // Daten aus Firebase auslesen
  async getDocumentFromFirebase() {
    const querySnapshot = await getDocs(collection(this.db, 'games'));
    // querySnapshot.forEach((doc) => {
    //   console.log('daten auslesen:', `${doc.id} => ${doc.data()}`);
    // });
  }

  // Daten aus Firebase auslesen als String
  async getDocumentsFromFirebaseStringify() {
    try {
      const querySnapshot = await getDocs(this.gameCollection());
      querySnapshot.forEach((doc) => {
        // console.log(
        //   'Daten auslesen als String:',
        //   `${doc.id} => ${JSON.stringify(doc.data())}`
        // );
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Dokumente:', error);
    }
  }

  // Daten in Firebase aktualisieren
  async saveGame() {
    const gameData = this.game.toJson();
    const firebaseData = doc(this.db, 'games', `${this.gameId}`);

    await updateDoc(firebaseData, {
      players: gameData.players,
      stack: gameData.stack,
      playedCards: gameData.playedCards,
      currentPlayer: gameData.currentPlayer,
    });
  }

  // async updateDocumentInFirebaseJSON() {
  //   const firebaseData = doc(this.db, 'users', params['id']); // Users = Sammlung   // cBOxtTSkfVFzfXqhIw8f = Id

  //   await updateDoc(firebaseData, {
  //     first: 'pascal',
  //   });
  // }

  gameCollection() {
    return collection(this.db, 'games');
  }

  collectionUsers() {
    return collection(this.db, 'users');
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      console.log(this.game.currentCard);
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
