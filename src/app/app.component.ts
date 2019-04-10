import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {loadCss, loadModules} from 'esri-loader';
import {EarthquakesService} from './earthquakes/earthquakes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('viewDiv') mapEl: ElementRef;

  constructor(private earthquakesService: EarthquakesService) {
    earthquakesService.loadLatestEarthquakes().then(console.log);
  }

  ngOnInit(): void {
    loadModules(['esri/Map', 'esri/views/SceneView', 'esri/layers/WMSLayer'], {css: true}).then(([Map, SceneView, WMSLayer]) => {
      const map = new Map({
        basemap: 'streets',
        ground: 'world-elevation'
      });
      map.ground.navigationConstraint = {
        type: 'none'
      };
      const view = new SceneView({
        container: this.mapEl.nativeElement,
        map
      });
      const layer = new WMSLayer({
        url: 'http://services.ga.gov.au/gis/services/GA_Surface_Geology/MapServer/WmsServer',
        opacity: 0.75
      });
      map.layers.add(layer);
    });
  }
}
