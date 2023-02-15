import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import ImageLayer from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Map from 'ol/Map';
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import { Feature, View } from 'ol';
import { Point } from 'ol/geom';
import Static from 'ol/source/ImageStatic';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { fromLonLat } from 'ol/proj';
import { defaults, FullScreen } from 'ol/control';
declare let plotty: any

@Component({
  selector: 'app-showndvi',
  templateUrl: './showndvi.component.html',
  styleUrls: ['./showndvi.component.scss']
})
export class ShowndviComponent implements OnInit,AfterViewInit  {
  bands: any;
  image: any;
  box: any;
  rawBox: any;
  geotiffLayer =new ImageLayer();
  feature: Feature<Point> = new Feature()
  max:any;
  min:any;
  extent:any=[]; 
  map: any;
  path : any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ShowndviComponent>,
  private _api: UserService,) { }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.getGeotiffLayer(this.data.id);
  }

  // initializeMap():void {
  //   console.log("extent")
  //   this.map = new Map({
  //     view: new View({
  //       // center:[0,0],
  //       center: fromLonLat([71.24927643949438,30.334693449413507]),
  //       zoom: 18, //[17.1144, 50.4100]
  //     }),
  //     layers: [
  //       new TileLayer({
  //         source: new OSM(),
  //         visible: false,
  //       }),
  //       new TileLayer({
  //         source: new BingMaps({
  //           key: 'AgTnzJkmRqwx4xZ_XT-BNsrpl0ABS9jUkvDQo-vw3d47_6xsFcScNvLXcaeXdHdA',
  //           imagerySet: 'AerialWithLabels',
  //         }),
  //         visible: true,
  //       }),
  //     ],
  //     target: 'ol-map',
  //   })

  //   const source = new VectorSource({wrapX: false});
  //     const vector = new VectorLayer({
  //       source: source,
  //     });
  //     this.geotiffLayer = new ImageLayer();
  // }


  ngAfterViewInit(): void {
  
  }

  initializeMap(extent:any){
    this.map = new Map({
      controls: defaults({attribution:false}).extend([new FullScreen()]),
      target: 'ol-map',
      layers: [
        new TileLayer({
          source: new BingMaps({
            key: 'AgTnzJkmRqwx4xZ_XT-BNsrpl0ABS9jUkvDQo-vw3d47_6xsFcScNvLXcaeXdHdA',
            imagerySet: 'AerialWithLabels',
          }),
          visible: true,
        }),
        this.geotiffLayer
      ],
      view: new View({
        // center:[0,0],
        center: fromLonLat([extent[0],extent[3]]),
        zoom: 18, //[17.1144, 50.4100]
      }),
      
    })

    const source = new VectorSource({wrapX: false});
      const vector = new VectorLayer({
        source: source,
      });
  }
  //tiff reader method 

  async tifLoader(extent:any,path:any,max:any,min:any){
    this.initializeMap(extent);
    console.log("path",path)
    const response = await fetch(`${path}`);
    console.log("response",response)
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await fromArrayBuffer(arrayBuffer);
    this.image = await tiff.getImage();
    console.log("tiff",tiff);
    const width = Math.ceil(this.image.getWidth() / 10);
    const height = Math.ceil(this.image.getHeight() / 10)
    this.rawBox = this.image.getBoundingBox();
    this.box = [this.rawBox[0],this.rawBox[1] - (this.rawBox[3] - this.rawBox[1]), this.rawBox[2], this.rawBox[1]];
    this.bands = await this.image.readRasters(); //DEMs are single-band rasters, so band 0 can be hardcoded here
    let the_canvas = document.createElement('canvas');
    const minValue = max      //@needToFix Math.min.apply(Math,this.bands[0]); 
    const maxValue = min           //@needToFix Math.max.apply(Math,this.bands[0])
    const plot = new plotty.plot({
      canvas: the_canvas,
      data:this.bands[0], width:this.image.getWidth() , height: this.image.getHeight(),
      domain: [minValue, maxValue], colorScale:'greens',clampLow: true, clampHigh: true
      });
      plot.render();      
      const imgSource = new Static({
                url: the_canvas.toDataURL("image/png"),
                imageExtent: this.rawBox,
                projection: 'EPSG:4326' //to enable on-the-fly raster reprojection
          })
   this.geotiffLayer.setSource(imgSource);
   
  }

  public getGeotiffLayer(id:any){
     this._api.getHealthanalysis(id).subscribe(
      (res:any) => {
        // console.log(res)
        const extent=res.bbox;
        const path= res.path;
        const max=res.max_value;
        const min=res.min_value;
        console.log(max,min)
        this.tifLoader(extent,path,max,min);
      },
      err=> console.log(err), 
      )
     }


  public close(){
    this.dialogRef.close();
  }   
}
