import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/games';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const firebaseConfig = environment.firebaseConfig;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();

  items$;
  items;

  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {
    this.items$ = collectionData(this.pascalCollection());
    this.items = this.items$.subscribe((list) => {
      list.forEach((element) => {
        console.log('test', element);
      });
    });
  }

  ngOnInit(): void {
    this.newGame();

    // this.firestore
    //   .collection('game')
    //   .valueChanges()
    //   .subscribe((game: Game) => {
    //     console.log('JUNUS FUNKTION', game);
    //   });
  }

  pascalCollection() {
    return collection(this.firestore, 'game');
  }

  PascalGetSingelDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
