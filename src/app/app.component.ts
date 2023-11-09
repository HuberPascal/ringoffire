import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // firestore: Firestore = inject(Firestore);
  title = 'ringoffire';
  constructor() {}
}
