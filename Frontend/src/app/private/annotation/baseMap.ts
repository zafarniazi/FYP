import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/WebGLTile';
import  Tile from 'ol/layer/Tile';
import TileImage from "ol/source/TileImage";
import View from 'ol/View';
import {Attribution, defaults} from 'ol/control';
import FullScreen from 'ol/control/FullScreen';
import BingMaps from 'ol/source/BingMaps';
import Stamen from 'ol/source/Stamen';
import GeoTIFF from 'ol/source/GeoTIFF';
const Geocoder = require('ol-geocoder');
import { Overlay } from 'ol';
import { fromLonLat, Projection } from 'ol/proj';
import {getCenter} from 'ol/extent';
import {register} from 'ol/proj/proj4';
import {transform} from 'ol/proj';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import ImageWMS from 'ol/source/ImageWMS';
// const  Potly = require('plotly.js');
const  proj4 = require('proj4').default;

const mapIntialization = ()=> { 

  const geotiffLayer = new ImageLayer();
  const map = new Map({
    controls: defaults({attribution:false}).extend([new FullScreen()]),
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
        visible:false
      }),
      new TileLayer({
                  source : new BingMaps({ 
                    key : "AgTnzJkmRqwx4xZ_XT-BNsrpl0ABS9jUkvDQo-vw3d47_6xsFcScNvLXcaeXdHdA",
                    imagerySet: 'AerialWithLabels',
                    
                  }),
                  visible : true
                }),
                geotiffLayer,
                new ImageLayer({
                  source: new ImageWMS({
                    url: 'https://geo.api.vlaanderen.be/OMWRGBMRVL/wms?',
                    params: {'LAYERS': 'Ortho,Vliegdagcontour'},
                    crossOrigin: 'anonymous',
                  })
                  }),
    ],
    view: new View({
      // center:[0,0],
      center: fromLonLat([90.3563, 23.6859]),//32.70346112493776
      zoom: 11  //[17.1144, 50.4100]
    })
  });
  var geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    lang: 'en',
    placeholder: 'Search for ...',
    limit: 5,
    debug: false,
    autoComplete: true,
    keepOpen: true
  });
  map.addControl(geocoder);
    
  // //Listen when an address is chosen
  geocoder.on('addresschosen', function (evt:any) {
    console.info(evt);
    window.setTimeout(function () {
      // popup.show(evt.coordinate, evt.address.formatted);
      var popup = new Overlay({
        element: evt.coordinate+evt.address.formatted,
        positioning: 'center-left',
      });
      map.addOverlay(popup);
    }, 3000);
  });
  return map
  }
export default mapIntialization











// const source = new GeoTIFF({
  //   sources : [
  //     { 
  //       url: '',
  //    },
  //   ],
  //   interpolate: false,
  //   normalize: false,
  //   convertToRGB: true,
    
  // })
  // const pixelValue = [
  //   "case",
  //   ["<=", ["band", 0], 0.0],
  //   -1,
  //   ["between", ["band", 0], 0.0, 5.0],
  //   0,
  //   ["between", ["band", 0], 5.0, 6.0],
  //   1,
  //   ["between", ["band", 0], 6.0, 7.0],
  //   2,
  //   ["between", ["band", 0], 7.0, 8.0],
  //   3,
  //   ["between", ["band", 0], 8.0, 9.0],
  //   4,
  //   ["between", ["band", 0], 9.0, 10.0],
  //   5,
  //   6,
  // ];
  // console.log("jshdfjdgfh"+source.getView());
  // console.log(source);



// popup
// var popup = new Overlay.Popup();
// map.addOverlay(popup);