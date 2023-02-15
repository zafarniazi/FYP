import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/WebGLTile';
import Tile from 'ol/layer/Tile';
import TileImage from 'ol/source/TileImage';
import View from 'ol/View';
import { Attribution, defaults } from 'ol/control';
import FullScreen from 'ol/control/FullScreen';
import BingMaps from 'ol/source/BingMaps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyMxRecord, AnyNaptrRecord } from 'dns';
import { fromLonLat } from 'ol/proj';
import ImageLayer from 'ol/layer/Image';
import { fromArrayBuffer } from 'geotiff';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Polygon from 'ol/geom/Polygon';
import Static from 'ol/source/ImageStatic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { tap } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
declare let plotty: any;

@Component({
  selector: 'app-farm-new',
  templateUrl: './farm-new.component.html',
  styleUrls: ['./farm-new.component.scss'],
})
export class FarmNewComponent implements OnInit {
  map: any;
  geotiffLayer: any;
  bands: any;
  image: any;
  box: any;
  rawBox: any;
  feature: Feature<Point> = new Feature();
  max: any;
  extent: any;
  exform: any;
  today = new Date ();
  public entity: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FarmNewComponent>,
    private _api: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // console.log("polygon",this.data);
    // console.log(this.data.extent[0]);
    this.geotiffLayer = new ImageLayer();
    this.map = new Map({
      // controls: defaults({attribution:false}).extend([new FullScreen()]),
      view: new View({
        // center:[this.data.bbox[0],this.data.bbox[3]],
        center: fromLonLat([this.data.extent[0], this.data.extent[3]]),
        // center: fromLonLat([74.18869411227769, 31.581469511780313]),//32.70346112493776
        zoom: 18, //[17.1144, 50.4100]
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
          visible: false,
        }),
        new TileLayer({
          source: new BingMaps({
            key: 'AgTnzJkmRqwx4xZ_XT-BNsrpl0ABS9jUkvDQo-vw3d47_6xsFcScNvLXcaeXdHdA',
            imagerySet: 'AerialWithLabels',
          }),
          visible: true,
        }),
      ],
      target: 'ol-map',
    });

    this.drawPolygonOnMap(this.data.coordinates);

    //form
    this.exform = new FormGroup({
      name: new FormControl(null, Validators.required),
      time_from: new FormControl('', Validators.required),
      time_to: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    let farmData = this.exform.value;
    const fromDate = new Date(farmData.time_from);
    const formattedDate = moment(fromDate).format('YYYY-MM-DD');
    const timeto = new Date(farmData.time_to);
    const timeFormatted = moment(timeto).format('YYYY-MM-DD');
    farmData.time_from = formattedDate;
    farmData.time_to = timeFormatted;
    farmData.yield_area=this.data.area.toString() || 4;
    farmData.user = this._api.getuserid();
    farmData.coordinates = this.data.coordinates;
    farmData.bbox = this.data.extent;
    
    this._api
      .healthanalysis(farmData)
      .pipe(
        tap((res) => {
          console.log(res);
          this._router.navigate(['private/dashboard/records',{area :this.data.area}]);
          this.close();
        })
      )
      .subscribe();
  }
  //draw custom polygon

  public drawPolygonOnMap(coordinates: any) {
    const polygonFeature = new Feature(
      new Polygon(coordinates).transform('EPSG:4326', 'EPSG:3857')
    );
    let source = new VectorSource({
      features: [polygonFeature],
    });

    var layer = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    this.map.addLayer(layer);
  }
  //close modal
  public close(): void {
    this.dialogRef.close();
  }
}
