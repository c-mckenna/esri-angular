import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

type LatLng = [number, number];

interface Earthquake {
  coordinates: LatLng;
  depth: number;
}

@Injectable()
export class EarthquakesService {
  readonly EQ_URL = 'https://earthquakes.ga.gov.au/geoserver/earthquakes/wfs?request=GetFeature&version=2.0.0&typeNames=earthquakes:earthquakes&outputFormat=application/json&count=10&sortBy=origin_time%20D';

  constructor(private http: HttpClient) {
  }

  public async loadLatestEarthquakes(): Promise<Earthquake[]> {
    const earthquakes = await this.http.get<any>(this.EQ_URL).toPromise();

    return earthquakes.features.map((earthquake) => ({
      coordinates: earthquake.geometry.coordinates.reverse(),
      depth: earthquake.properties.depth
    }));
  }
}
