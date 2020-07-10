
/* eslint-disable */
import transformer from 'coordtransform/index.js'
var BaiduMercator = {
  MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
  LLBAND: [75, 60, 45, 30, 15, 0],
  MC2LL: [
      [1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331,
          200.9824383106796, -187.2403703815547, 91.6087516669843,
          -23.38765649603339, 2.57121317296198, -0.03801003308653,
          17337981.2],
      [-7.435856389565537e-9, 0.000008983055097726239,
          -0.78625201886289, 96.32687599759846, -1.85204757529826,
          -59.36935905485877, 47.40033549296737, -16.50741931063887,
          2.28786674699375, 10260144.86],
      [-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616,
          59.74293618442277, 7.357984074871, -25.38371002664745,
          13.45380521110908, -3.29883767235584, 0.32710905363475,
          6856817.37],
      [-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591,
          40.31678527705744, 0.65659298677277, -4.44255534477492,
          0.85341911805263, 0.12923347998204, -0.04625736007561,
          4482777.06],
      [3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062,
          23.10934304144901, -0.00023663490511, -0.6321817810242,
          -0.00663494467273, 0.03430082397953, -0.00466043876332,
          2555164.4],
      [2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8,
          7.47137025468032, -0.00000353937994, -0.02145144861037,
          -0.00001234426596, 0.00010322952773, -0.00000323890364,
          826088.5]],

  LL2MC: [
      [-0.0015702102444, 111320.7020616939, 1704480524535203,
          -10338987376042340, 26112667856603880,
          -35149669176653700, 26595700718403920,
          -10725012454188240, 1800819912950474, 82.5],
      [0.0008277824516172526, 111320.7020463578, 647795574.6671607,
          -4082003173.641316, 10774905663.51142, -15171875531.51559,
          12053065338.62167, -5124939663.577472, 913311935.9512032,
          67.5],
      [0.00337398766765, 111320.7020202162, 4481351.045890365,
          -23393751.19931662, 79682215.47186455, -115964993.2797253,
          97236711.15602145, -43661946.33752821, 8477230.501135234,
          52.5],
      [0.00220636496208, 111320.7020209128, 51751.86112841131,
          3796837.749470245, 992013.7397791013, -1221952.21711287,
          1340652.697009075, -620943.6990984312, 144416.9293806241,
          37.5],
      [-0.0003441963504368392, 111320.7020576856, 278.2353980772752,
          2485758.690035394, 6070.750963243378, 54821.18345352118,
          9540.606633304236, -2710.55326746645, 1405.483844121726,
          22.5],
      [-0.0003218135878613132, 111320.7020701615, 0.00369383431289,
          823725.6402795718, 0.46104986909093, 2351.343141331292,
          1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]],

  getRange: function (v, min, max) {
    v = Math.max(v, min);
    v = Math.min(v, max);
    return v;
  },

  getLoop: function (v, min, max) {
    var d = max - min;
    while (v > max) {
      v -= d;
    }
    while (v < min) {
      v += d;
    }
    return v;
  },

  convertor: function (input, table) {
    var px = input[0];
    var py = input[1];
    var x = table[0] + table[1] * Math.abs(px);
    var d = Math.abs(py) / table[9];
    var y = table[2]
        + table[3]
        * d
        + table[4]
        * d
        * d
        + table[5]
        * d
        * d
        * d
        + table[6]
        * d
        * d
        * d
        * d
        + table[7]
        * d
        * d
        * d
        * d
        * d
        + table[8]
        * d
        * d
        * d
        * d
        * d
        * d;

    return [
      x * (px < 0 ? -1 : 1),
      y * (py < 0 ? -1 : 1)
    ];
  },

  forward: function (input) {
    var lng = BaiduMercator.getLoop(input[0], -180, 180);
    var lat = BaiduMercator.getRange(input[1], -74, 74);

    var table = null;
    var j;
    for (j = 0; j < BaiduMercator.LLBAND.length; ++j) {
      if (lat >= BaiduMercator.LLBAND[j]) {
        table = BaiduMercator.LL2MC[j];
        break;
      }
    }
    if (table === null) {
      for (j = BaiduMercator.LLBAND.length - 1; j >= 0; --j) {
        if (lat <= -BaiduMercator.LLBAND[j]) {
          table = BaiduMercator.LL2MC[j];
          break;
        }
      }
    }
    return BaiduMercator.convertor([lng, lat], table);
  },

  inverse: function (input) {
    var y_abs = Math.abs(input[1]);
    var table = null;
    for (var j = 0; j < BaiduMercator.MCBAND.length; j++) {
      if (y_abs >= BaiduMercator.MCBAND[j]) {
        table = BaiduMercator.MC2LL[j];
        break;
      }
    }
    return BaiduMercator.convertor(input, table);
  }
};
var BaiduSphericalMercator = {
  project: function (latLng) {
    var coords = transformer.gcj02tobd09(latLng.lng, latLng.lat)
    var lng = coords[0]
    var lat = coords[1]
    var bpoint = BaiduMercator.forward([lng, lat]);
    return L.point(bpoint[0], bpoint[1]);
  },

  unproject: function (bpoint) {
    var blatlng = BaiduMercator.inverse([bpoint.x, bpoint.y]);
    var coords = transformer.bd09togcj02(blatlng[0], blatlng[1])
    var lng = coords[0]
    var lat = coords[1]
    return L.latLng(lat, lng);
  },

  bounds: (function () {
    var MAX = 33554432;
    return L.bounds([-MAX, -MAX], [MAX, MAX]);
  })()
};

var BaiduCRS = L.extend({}, L.CRS.Earth, {
  code: 'BAIDU',
  projection: BaiduSphericalMercator,
  wrapLng: undefined,
  wrapLat: undefined,
  R: 6370996.81,
  scale: function (zoom) { return 256 * Math.pow(2, zoom); },
  zoom: function (scale) { return Math.log(scale / 256) / Math.LN2; },
  transformation: (function () {
    var zoom = 18;
    var scale = 1 / (256 * Math.pow(2, zoom));
    return L.transformation(scale, 0.5, -scale, 0.5)
  })()
});

var BaiduLayer = L.TileLayer.extend({
  options: {
    minZoom: 3,
    maxZoom: 19
  },

  initialize: function (template) {
    var url = template;
    var options = {};
    options.subdomains = '0123456789'
    L.TileLayer.prototype.initialize.call(this, url, options);
  },

  getTileUrl: function (coords) {
    var offset = Math.pow(2, coords.z - 1);
    var x = coords.x - offset;
    var y = offset - coords.y - 1;
    var baiduCoords = L.point(x, y);
    baiduCoords.z = coords.z;
    return L.TileLayer.prototype.getTileUrl.call(this, baiduCoords)
  }
});

L.Projection.BaiduMercator = BaiduSphericalMercator;
L.CRS.Baidu = BaiduCRS;
L.tileLayer.baiduLayer = function (template) {
  return new BaiduLayer(template)
};

export default L
