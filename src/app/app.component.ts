import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  saveFeature = 'Recipe';

  onNavigate(feature: string) {
    this.saveFeature = feature;
    console.log(this.saveFeature);
    
  }
}
