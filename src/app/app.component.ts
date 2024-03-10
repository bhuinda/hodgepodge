import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectionsComponent } from './components/connections/connections.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConnectionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  connectionsGameId: number = 1;
}
