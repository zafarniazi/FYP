import { Component, OnInit } from '@angular/core';
import mapIntialization from './baseMap';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import WKT from 'ol/format/WKT';
import Polygon from 'ol/geom/Polygon';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import ImageLayer from 'ol/layer/Image';
import { transformExtent } from 'ol/proj';
// import { GeoTIFF} from 'geotiff'
// var GeoTIFF = require('geotiff')
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import Static from 'ol/source/ImageStatic';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { modalConfig, ModalEnum } from 'src/app/core/modals/modalConfigs';
import { FarmNewComponent } from './farm-new/farm-new.component';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import {getArea, getLength} from 'ol/sphere';
import { unByKey } from 'ol/Observable';
declare let plotty: any;

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
})
export class AnnotationComponent implements OnInit {
  draw: any;
  bands: any;
  image: any;
  box: any;
  rawBox: any;
  geotiffLayer: any;
  feature: Feature<Point> = new Feature();
  max: any;
  extent: any;
  spinnerToggle: boolean = false;
  geomType:any;
  lastFeature:any;
  vector_source:any;
  sphere :any
  area:any
  listener:any;
  constructor(private _api: UserService, public dialog: MatDialog) {}
  ngOnInit(): void {
    const map = mapIntialization();
    this.vector_source = new VectorSource({ wrapX: false });
    const vector = new VectorLayer({
      source: this.vector_source,
      style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33'
            })
        })
    })
    });

    this.geotiffLayer = new ImageLayer();
    map.addLayer(vector);
    map.addLayer(this.geotiffLayer);
    document.getElementById('polygon')?.addEventListener('click', () => {
      this.draw = new Draw({
        source: this.vector_source,
        type: 'Polygon',
      });
      map.addInteraction(this.draw);
      //draw start 
      
      this.draw.on('drawstart',(e:any)=>{
        this.listener= e.feature.getGeometry().on('change',  (evt:any) => {
          const geom  = evt.target
          if(geom instanceof Polygon) {
            this.area= this.formatArea(geom);
          }
          
        })
        // Filter on all BUT points
        if (this.geomType !== 'Polygon') {
          this.vector_source.clear();  // implicit remove of last feature.
       }


    });


      //draw polygon
      this.draw.on('drawend', (evt: any) => {
        map.removeInteraction(this.draw);
        const polygon = new Polygon(evt.feature.getGeometry().getCoordinates());
        polygon.transform('EPSG:3857', 'EPSG:4326');
        const projectionLink = map.getView().getProjection();
        this.extent = transformExtent(
          polygon.getExtent(),
          projectionLink,
          'EPSG:3857'
        );
        //call calculate Area method 
        unByKey(this.listener);
        const coordinate = polygon.getCoordinates();
        map.removeInteraction(this.draw);
        this.onCreateFarm(coordinate, this.extent,this.area);
      });
    });
      document.getElementById('rem_polygon')?.addEventListener('click', () => {
        map.removeInteraction(this.draw);
    });

  }

  //create farm modal
  public onCreateFarm(coordinate: any, extent: any,area:any): void {
    const modal = this.dialog.open(
      FarmNewComponent,
      modalConfig(
        {
          data: {
            coordinates: coordinate,
            extent: extent,
            area :area
          },
          panelClass: ['animate__animated', 'animate__slideInRight', 'trendy'],
        },
        ModalEnum.ModalDefault
      )
    );
    modal.afterClosed().subscribe(() => {});
  }



//remove interaction 
 public removeLastFeature() {
  if (this.lastFeature)
    this.vector_source.removeFeature(this.lastFeature);
};



  // calculate area of polygon 

  public formatArea (polygon:any) {
    let area = getArea(polygon);
    console.log(area);
    //  let calArea = parseFloat(area.toString().replace(/e[-]/g, "0000000"));
    let output;
    if (area > 10000) {
      console.log("km")
      let km= Math.round((area / 1000000) * 100) / 100 ;
      console.log("km",km)
      output = km * 100 ;
    } else {
      console.log("m")
      let m = Math.round(area * 100) / 100;
      console.log("m",m)
      output = m * 0.0001;
    }

    console.log("output",output);
     return output; 
  };
}
