import { Component, OnChanges, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  // cardAction = [
  //   {
  //     title: 'Waterfall',
  //     description:
  //       'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.',
  //   },
  //   { title: 'You', description: 'You decide who drinks' },
  //   { title: 'Me', description: 'Congrats! Drink a shot!' },
  //   {
  //     title: 'Category',
  //     description:
  //       'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.',
  //   },
  //   {
  //     title: 'Bust a jive',
  //     description:
  //       'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ',
  //   },
  //   { title: 'Chicks', description: 'All girls drink.' },
  //   {
  //     title: 'Heaven',
  //     description: 'Put your hands up! The last player drinks!',
  //   },
  //   {
  //     title: 'Mate',
  //     description:
  //       'Pick a mate. Your mate must always drink when you drink and the other way around.',
  //   },
  //   { title: 'Thumbmaster', description: '' },
  //   { title: 'Men', description: 'All men drink.' },
  //   { title: 'Quizmaster', description: '' },
  //   {
  //     title: 'Never have i ever...',
  //     description:
  //       'Say something you nnever did. Everyone who did it has to drink.',
  //   },
  //   {
  //     title: 'Rule',
  //     description:
  //       'Make a rule. Everyone needs to drink when he breaks the rule.',
  //   },
  // ];

  cardAction = [
    {
      title: 'Gemeinsames Trinken',
      description:
        'Alle müssen gleichzeitig trinken. Startet das Trinken und hört auf, wenn der Spieler vor dir aufhört. Cheers!',
    },
    {
      title: 'Du',
      description:
        'Du bestimmst, wer trinkt. Wähle einen Spieler aus und sag "Du trinkst!"',
    },
    {
      title: 'Ich',
      description: 'Glückwunsch! Du darfst einen Schluck nehmen! Prost!',
    },
    {
      title: 'Kategorie',
      description:
        'Denkt euch eine Kategorie aus (z.B. Filme). Jeder Spieler muss einen Begriff aus dieser Kategorie nennen. Wer es nicht schafft, trinkt.',
    },
    {
      title: 'Wortkette',
      description:
        'Bildet gemeinsam eine Wortkette! Der erste Spieler sagt ein Wort (z.B., "Apfel"). Der nächste Spieler wiederholt dieses Wort und fügt ein neues hinzu (z.B., "Apfel, Banane"). So geht es weiter, bis jemand ein Wort vergisst. Dieser Spieler muss trinken!',
    },

    {
      title: 'Mädelsabend',
      description:
        'Alle Mädels trinken. Die Jungs dürfen zuschauen und anstoßen.',
    },
    {
      title: 'Himmel',
      description:
        'Streckt die Arme nach oben! Der letzte Spieler, der es schafft, trinkt.',
    },
    {
      title: 'Kumpel',
      description:
        'Wählt euch einen Kumpel aus. Euer Kumpel muss immer trinken, wenn ihr trinkt, und umgekehrt. Teamarbeit ist gefragt!',
    },
    {
      title: 'Daumenmeister',
      description:
        'Du bist der Daumenmeister! Wenn du deinen Daumen zeigst, müssen alle anderen es auch tun. Der Letzte, der es merkt, trinkt.',
    },
    {
      title: 'Jungs',
      description: 'Alle Jungs trinken. Die Mädels dürfen zuschauen.',
    },
    {
      title: 'Quizmaster',
      description:
        'Du bist der Quizmaster! Stellt euch abwechselnd Fragen. Wer falsch antwortet, trinkt.',
    },
    {
      title: 'Ich habe noch nie...',
      description:
        'Sagt etwas, das ihr noch nie gemacht habt. Jeder, der es getan hat, trinkt. Wenn niemand trinkt, müsst ihr selbst trinken.',
    },
    {
      title: 'Regel',
      description:
        'Stellt eine Regel auf. Jeder muss trinken, wenn er gegen die Regel verstößt. Beispiele: Kein Gebrauch von Vornamen oder Hände müssen während des Spiels sichtbar sein.',
    },
  ];

  title: string = '';
  description: string = '';
  @Input() card: string = '';

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
