<template>
  <div id="zoomControl">
    <div class="download" @click="downLoad" v-if="download">
      <i class="el-icon-download"></i>
    </div>
    <div class="collect" @click="openCollect" v-if="collect">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshoucang"></use>
      </svg>
    </div>
    <div class="settings" @click="drawer = true" v-if="settings">
      <img src="../../../../static/map/setting.svg" alt="">
    </div>
    <div class="circulation-img" @click="circulationImgDialog = true" v-if="circulation">
      <span>环流形势</span>
    </div>
    <div class="zoom-control">
      <div @click="zoomChange(0)">100%</div>
      <div @click="zoomChange(1)"><i class="el-icon-plus"></i></div>
      <div @click="zoomChange(-1)"><i class="el-icon-minus"></i></div>
    </div>
    <el-dialog
      :append-to-body="true"
      :show-close="false"
      class="circulation-img-dialog"
      width="90%"
      :visible.sync="circulationImgDialog">
      <div class="header" slot="title">
        <svg class="icon" aria-hidden="true" @click="circulationImgDialog = false">
          <use xlink:href="#iconshanchumorenzhuangtai"></use>
        </svg>
        <div class="filter-item">
          <span class="label">时间：</span>
          <el-date-picker
            v-model="filterOptions.datePicker"
            class="date-picker"
            value-format="yyyy年MM月dd日"
            type="date"
            size="small"
            placeholder="选择日期">
          </el-date-picker>
          <span class="label period-title">时段：</span>
          <el-select class="time-frame" v-model="filterOptions.period" placeholder="请选择时段" size="small">
            <el-option
              v-for="item in periodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="hint">选择的时间是暴雨发生时点，对应的环流形势图是该暴雨发生时前12小时的状态</span>
        </div>
        <div class="filter-item last">
          <span class="label">层次：</span>
          <el-radio-group v-model="filterOptions.levelRadio" size="small">
            <el-radio-button class="layer-btn" :label="item.value" v-for="(item, index) in levelRadioOptions" :key="index">{{item.label}}</el-radio-button>
          </el-radio-group>
          <span class="label field">场：</span>
          <el-button size="mini" type="primary" class="field-btn">海平面气压</el-button>
        </div>
      </div>
      <div class="body">
        <div class="date">
          <span>{{filterOptions.datePicker}}</span>
          <span v-if="filterOptions.datePicker">{{getTimeFrame()}}</span>
          <div>{{filterData}}</div>
        </div>
      </div>
    </el-dialog>
    <div class="legend">
      <div class="unit">mm</div>
      <div class="legend-text">
        <span>250-400</span>
        <span>100-250</span>
        <span>50-100</span>
        <span>25-50</span>
        <span>10-25</span>
        <span>0.1-10</span>
        <span>0-0.1</span>
      </div>
      <div class="legend-color">
        <span class="color250-400"></span>
        <span class="color100-250"></span>
        <span class="color50-100"></span>
        <span class="color25-50"></span>
        <span class="color10-25"></span>
        <span class="color01-10"></span>
        <span class="color0-01"></span>
      </div>
    </div>
    <el-drawer
      title="地图设置"
      class="drawer"
      :modal="false"
      :append-to-body="true"
      :with-header="false"
      :visible.sync="drawer"
      :direction="direction">
      <div class="map-setting">
        <el-form ref="form" label-width="82px">
          <el-form-item label="类型：">
            <map-type-radio
              :options="formConfig.mapTypeConfig"
              v-model="form.mapType"
            ></map-type-radio>
          </el-form-item>
          <el-form-item label="边界：">
            <!--            <el-button size="mini">省界</el-button>-->
            <!--            <el-button size="mini">市界</el-button>-->
            <!--            <el-button size="mini">县界</el-button>-->
            <custom-button-group
              :options="formConfig.borderConfig"
              v-model="form.border"
              @input="borderChange"
              multiple="true"
              size="mini"
            ></custom-button-group>
          </el-form-item>
          <el-form-item label="地名：">
            <custom-button-group
              :options="formConfig.locateNameConfig"
              v-model="form.locateName"
              @input="locateNameChange"
              multiple="true"
              size="mini"
            ></custom-button-group>
          </el-form-item>
          <el-form-item label="站点信息：">
            <custom-button-group
              :options="formConfig.siteTypeConfig"
              v-model="form.siteType"
              multiple="true"
              @input="siteTypeChange"
              size="mini"
            ></custom-button-group>
          </el-form-item>
          <el-form-item>
            <custom-button-group
              :options="formConfig.pointSettingConfig"
              v-model="form.pointSetting"
              multiple="true"
              @input="pointSettingChange"
              size="mini"
            ></custom-button-group>
          </el-form-item>
          <el-form-item label="色斑图：">
            <el-switch
              v-model="form.colorPlateFigure"
              @change="colorPlateFigureChange"
              :active-text="form.colorPlateFigure ? '开' : '关'">
            </el-switch>
          </el-form-item>
          <!--          <el-form-item>-->
          <!--            <el-button type="primary" @click="onSubmit" size="mini">确定</el-button>-->
          <!--            <el-button size="mini" @click="drawer = false">取消</el-button>-->
          <!--          </el-form-item>-->
        </el-form>
      </div>
    </el-drawer>
    <el-dialog
      :append-to-body="true"
      :show-close="false"
      class="collect-dialog"
      :visible.sync="collectDialog"
      width="584px">
      <div class="dialog-title" slot="title">
        <span>收藏个例至个例分类</span>
        <svg class="icon" aria-hidden="true" @click="collectDialog = false">
          <use xlink:href="#iconshanchumorenzhuangtai"></use>
        </svg>
      </div>
      <div class="dialog-body" v-loading="loading">
        <el-checkbox-group v-model="checkList" class="checkbox-group">
          <div class="item" v-for="v in collectClassify" :key="v.id">
            <div class="title">{{v.catename}}</div>
            <div class="options" v-for="value in v.child" :key="value.id">
              <el-checkbox :label="value.id">{{value.catename}}</el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
        <div class="hint">没有找到您需要的分类？去<span @click="toRainstormCaseLib">【管理个例分类】</span></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="collectDialog = false" size="small" type="text" class="cancel">取 消</el-button>
        <el-button type="primary" @click="handleClick" size="small" :disabled="!checkList.length">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomButtonGroup from './components/custom-button-group'
import MapTypeRadio from './components/map-type-radio'
import { mapGetters } from 'vuex'
import htmlToJpg from './htmlToJpg'
import precipitationLayerCom from '@/components/map/layer-comps/precipitation-layer'
import nationalStandingPointLayerCom from '@/components/map/layer-comps/national-standing-point'
import $ from 'jquery'
import _ from 'lodash'
export default {
  components: {
    CustomButtonGroup,
    MapTypeRadio
  },
  props: {
    searchFilterData: {
      type: Object
    },
    activeName: {
      type: String
    },
    collect: {
      type: Boolean
    },
    download: {
      type: Boolean
    },
    circulation: {
      type: Boolean
    },
    settings: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      colorFigureData: 'colorFigureData',
      mapSetting: 'mapSetting',
      collectData: 'collectData',
      nationalStandingPointData: 'nationalStandingPointData'
    })
  },
  watch: {
    form: {
      handler (val) {
        this.$store.commit('SET_MAP_SETTING', val)
      },
      deep: true
    },
    'form.mapType': {
      handler (val) {
        if (val === 2) {
          this.form.colorPlateFigure = false
          $('.city-name').addClass('satellite-city-name')
        } else {
          $('.city-name').removeClass('satellite-city-name')
        }
      },
      deep: true
    },
    filterOptions: {
      handler (val) {
        let params = {}
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            if (val[key] && val['datePicker']) {
              params[key] = val[key]
            }
          }
        }
        if (JSON.stringify(params) !== '{}') {
          this.filterData = params
        }
      },
      deep: true
    }
  },
  data () {
    return {
      drawer: false, // 侧边栏
      collectDialog: false, // 收藏弹窗
      circulationImgDialog: false, // 环流形势弹窗
      direction: 'rtl',
      checkList: [],
      collectClassify: null,
      loading: false,
      mapImage: null,
      filterOptions: {
        datePicker: '',
        period: '1',
        levelRadio: ''
      },
      filterData: null, // 环流形式筛选的数据
      periodOptions: [
        {
          value: '1',
          label: '08:00-08:00'
        }, {
          value: '2',
          label: '20:00-20:00'
        }
      ],
      levelRadioOptions: [
        { value: '1', label: '地面' },
        { value: '2', label: '200hpa' },
        { value: '3', label: '500hpa' },
        { value: '4', label: '700hpa' },
        { value: '5', label: '850hpa' }
      ],
      form: {
        mapType: 1,
        border: [1, 2],
        locateName: [1],
        siteType: [],
        pointSetting: [],
        colorPlateFigure: true
      },
      formConfig: { // 配置对象
        mapTypeConfig: [
          { value: 1, label: '空白', img: require('../assets/map_type_blank.png') },
          { value: 2, label: '地形', img: require('../assets/map_type_terrain.png') }
        ],
        borderConfig: [
          { value: 1, label: '省界', disabled: false, selected: true },
          { value: 2, label: '市界', disabled: false, selected: false },
          { value: 3, label: '县界', disabled: false, selected: false }
        ],
        locateNameConfig: [
          // { value: 1, label: '省名', disabled: false },
          { value: 1, label: '市名', disabled: false, selected: false }
        ],
        siteTypeConfig: [
          { value: 1, label: '国家站', disabled: false, selected: false },
          { value: 2, label: '区域站', disabled: true, selected: false }
        ],
        pointSettingConfig: [
          { value: 1, label: '名称', disabled: false, selected: false },
          { value: 2, label: '站点值', disabled: false, selected: false }
        ]
      }
    }
  },
  mounted () {
    this.form = JSON.parse(JSON.stringify(this.mapSetting))
  },
  methods: {
    zoomChange (type) {
      this.$emit('zoomChange', type)
    },
    onSubmit () {
      this.drawer = false
    },
    borderChange (val) {
      // 城市边界
      val.findIndex(item => item === 2) !== -1 ? this.$layerManager.showLayer('city') : this.$layerManager.hideLayer('city')
      val.findIndex(item => item === 3) !== -1 ? this.$layerManager.showLayer('county') : this.$layerManager.hideLayer('county')
    },
    colorPlateFigureChange (val) {
      val ? this.addPrecipitationLayer(this.colorFigureData) : this.$layerManager.removeLayer('precipitationLayer')
    },
    locateNameChange (val) {
      // 市名
      val.length ? $('.city-name').removeClass('hidden-city-name') : $('.city-name').addClass('hidden-city-name')
    },
    siteTypeChange (val) {
      val.findIndex(item => item === 1) !== -1 ? this.addNationalStandingPointLayer(this.nationalStandingPointData) : this.$layerManager.removeLayer('nationalStandingPointLayer')
    },
    pointSettingChange (val) {
      val.findIndex(item => item === 2) !== -1 ? $('.hidden-point-value').addClass('point-value') : $('.hidden-point-value').removeClass('point-value')
      val.findIndex(item => item === 1) !== -1 ? $('.hidden-point-name').addClass('point-name') : $('.hidden-point-name').removeClass('point-name')
    },
    /**
       * 色斑图
       * @param geojson
       */
    addPrecipitationLayer (geojson) {
      let layerId = 'precipitationLayer'
      let layer = precipitationLayerCom.methods.getLayer(geojson, this)
      this.$layerManager.addLayer({ layerId, layer }, { legendObj: { com: precipitationLayerCom } })
      this.$layerManager.layers[layerId].bringToBack()
    },
    addNationalStandingPointLayer (geojson) {
      let layerId = 'nationalStandingPointLayer'
      let layer = nationalStandingPointLayerCom.methods.getLayer(geojson, this)
      this.$layerManager.addLayer({ layerId, layer }, { legendObj: { com: nationalStandingPointLayerCom } })
      this.$layerManager.layers[layerId].bringToFront()
    },
    getCollectClassify () {
      this.loading = true
      this.$api.getCollectClassify().then(res => {
        this.collectClassify = res.data
        this.loading = false
      }).catch(err => {
        this.$msgMnger.httpError(err)
        console.log(err)
        this.loading = false
      })
    },
    handleClick () {
      let newSearchFilterData = _.cloneDeep(this.searchFilterData)
      delete newSearchFilterData['page']
      delete newSearchFilterData['page_size']
      newSearchFilterData.ids = JSON.stringify(this.checkList)
      if (this.collectData.type === 'rainstormCase') {
        newSearchFilterData.e_day = (this.collectData.tree.year + this.collectData.tree.rdate).replace(/-/g, '')
      } else {
        newSearchFilterData.b_day = (this.collectData.tree.begindate).replace(/-/g, '')
        newSearchFilterData.e_day = (this.collectData.tree.enddate).replace(/-/g, '')
      }
      if (this.activeName === 'rainstormCase') {
        newSearchFilterData.rain_type = 1
      } else if (this.activeName === 'continuousRainstorm') {
        newSearchFilterData.rain_type = 2
      }
      this.setCollectRainstormClassify(newSearchFilterData)
    },
    setCollectRainstormClassify (params) {
      this.$api.setCollectRainstormClassify(params).then(res => {
        this.$msgMnger.success(res.msg)
        this.collectDialog = false
      }).catch(err => {
        this.$msgMnger.error(err.msg)
        console.log(err)
        this.collectDialog = false
      })
    },
    toRainstormCaseLib () {
      this.$router.push({ name: 'rainstorm-case-lib' })
    },
    openCollect () {
      this.checkList = []
      this.getCollectClassify()
      this.collectDialog = true
    },
    controlHide () {
      $('.download').addClass('hide')
      $('.collect').addClass('hide')
      $('.settings').addClass('hide')
      $('.zoom-control').addClass('hide')
      $('.circulation-img').addClass('hide')
      this.$layerManager.hideLayer('monitorStationLayer')
      $('.time-quantum-select').addClass('select-download')
      $('.point-con').addClass('point-con-hide-background')
    },
    controlShow () {
      $('.download').removeClass('hide')
      $('.collect').removeClass('hide')
      $('.settings').removeClass('hide')
      $('.zoom-control').removeClass('hide')
      $('.circulation-img').removeClass('hide')
      this.$layerManager.showLayer('monitorStationLayer')
      $('.time-quantum-select').removeClass('select-download')
      $('.point-con').removeClass('point-con-hide-background')
    },
    downLoad () {
      this.controlHide()
      htmlToJpg.getLeafletImage('.mc').then((pageData) => {
        this.controlShow()
      }).catch(err => {
        this.controlShow()
        console.error(err)
      })
    },
    getTimeFrame () {
      return this.periodOptions.filter(item => item.value === this.filterOptions.period)[0].label
    }
  }
}
</script>
<style scoped lang="scss">
  #zoomControl{
    width: 102px;
    position:absolute;
    bottom:30px;
    right:24px;
    background:transparent;
    user-select:none;
    z-index: 1001;
    font-size: 12px;
    cursor: default;
    .map-img{
      position: fixed;
      left: 0;
      top: 0;
    }
    .settings, .collect, .download, .circulation-img{
      width:38px;
      height:38px;
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 10px 0px rgba(0,0,0,0.14);
      border-radius:2px;
      border:1px solid rgba(131,142,164,1);
      text-align: center;
      margin: 0 0 17px 62px;
      cursor: pointer;
    }
    .circulation-img{
      height: 92px;
      font-size: 12px;
      color:rgba(80,87,111,1);
      writing-mode: vertical-lr;
      box-sizing: border-box;
      span{
        position: relative;
        transform: translateX(50%);
        left: 25%;
      }
    }
    .download{
      text-align: center;
      line-height: 38px;
      .el-icon-download{
        font-size: 18px;
      }
    }
    .settings{
      img{
        width:16px;
        height:16px;
        position: relative;
        transform: translateY(-50%);
        top: 50%;
      }
    }
    .collect{
      text-align: center;
      .icon{
        width:16px;
        height:15px;
        transform: translateY(50%);
        top: -50%;
      }
    }
    .zoom-control{
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 10px 0px rgba(0,0,0,0.14);
      border-radius:2px;
      border:1px solid rgba(131,142,164,1);
      width: 40px;
      margin: 0 0 30px 62px;
      >div {
        border-bottom: 1px solid rgb(206, 206, 206);
        text-align: center;
        height: 40px;
        font-size: 18px;
        padding: 8px 0 0 0;
        cursor: pointer;
        &:nth-of-type(1){
          font-size: 12px;
          padding-top: 11px;
        }
        &:last-child{
          border: none;
        }
      }
    }
    .legend{
      color: #999999;
      .unit{
        text-align: right;
        padding: 0 6px 2px 0;
      }
      .legend-text, .legend-color{
        >span{
          display: block;
        }
      }
      .legend-text{
        float: left;
        >span{
          padding: 4px 0;
          height: 24px;
          box-sizing: border-box;
        }
      }
      .legend-color{
        float: right;
        box-shadow:0px 8px 10px 0px rgba(0,0,0,0.14);
        >span{
          width: 38px;
          height: 24px;
          display: block;
        }
      }
      .color250-400{
        background: rgb(128,0,64);
      }
      .color100-250{
        background: rgb(250,0,250);
      }
      .color50-100{
        background: rgb(0,0,255);
      }
      .color25-50{
        background: rgb(96,184,255);
      }
      .color10-25{
        background: rgb(61,186,61);
      }
      .color01-10{
        background: rgb(161,241,141);
      }
      .color0-01{
        background: rgb(255,255,255);
      }
    }
    .hide{
      display: none;
    }
  }
</style>

<style lang="scss">
  .circulation-img-dialog{
    .header{
      position: relative;
      .icon{
        width: 24px;
        height: 24px;
        position: absolute;
        right: -32px;
        top: -32px;
        cursor: pointer;
      }
      .filter-item{
        padding-bottom: 20px;
        .label{
          color:rgba(17,36,80,1);
          font-size: 14px !important;
        }
        &.last{
          border-bottom: 1px solid #C4C9D4;
          .field-btn{
            span{
              color: white !important;
              font-size: 14px !important;
            }
          }
          .field{
            margin-left: 40px !important;
          }
        }
        .hint {
          margin-left: 16px !important;
          color: rgba(123, 133, 155, 1);
        }
        .time-frame{
          width: 120px !important;
        }
        .period-title{
          margin-left: 20px !important;
        }
        .layer-btn{
          margin-right: 16px;
          .el-radio-button__inner{
            width: 76px !important;
            height: 30px !important;
            background: rgba(245, 247, 248, 1) !important;
            border-radius: 4px;
            font-size: 14px !important;
            border: none !important;
          }
        }
        .is-active{
          .el-radio-button__inner{
            background: #3080FE !important;
          }
        }
      }
    }
  }
  .drawer{
    .map-setting{
      padding: 20px;
      box-sizing: border-box;
      .el-form-item:nth-child(2){
        margin-top: 65px !important;
      }
      .el-form-item:nth-child(5){
        margin-bottom: 136px !important;
      }
      .el-form-item:nth-child(6){
      }
    }
    .el-drawer{
      width: 382px !important;
    }
  }
  .collect-dialog{
    .el-dialog__header{
      padding: 0;
    }
    .el-dialog__body{
      padding: 0 56px;
    }
    .dialog-title{
      padding: 16px;
      height: 52px;
      background: #F5F7F8;
      box-sizing: border-box;
      position: relative;
      span{
        vertical-align: middle;
      }
      .icon{
        width: 24px;
        height: 24px;
        position: absolute;
        right: -12px;
        top: -12px;
        cursor: pointer;
      }
    }
    .dialog-body{
      margin-top: 28px;
      border-bottom: 1px solid #838EA4;
      .el-checkbox, .el-checkbox__label{
        vertical-align: middle;
      }
      .el-checkbox__inner{
        border-radius: 50% !important;
      }
      .el-checkbox__label{
        color: black;
        font-weight: normal;
      }
      .item{
        width: 200px;
        float: left;
        overflow: hidden;
        .title{
          font-size: 18px;
          color: black;
          font-weight: 600;
          line-height: 50px;
          border-bottom: 1px solid #B7BDCA;
        }
        .options{
          font-size: 14px;
          color: #000000;
          line-height: 14px;
          margin-top: 32px;
        }
      }
      .item:nth-child(odd){
        margin-right: 72px;
      }
      .hint{
        font-size: 14px;
        color: #7B859B;
        padding: 16px 0;
        clear: both;
        span{
          color: #3080FE;
          cursor: pointer;
        }
      }
    }
    .dialog-footer{
      margin: 20px 0 16px;
      .cancel{
        color: #000000;
        margin-right: 15px;
      }
    }
    .checkbox-group{
      max-height: 391px;
      overflow-y: auto;
    }
    /*滚动条样式*/
    .checkbox-group::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .checkbox-group::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    .checkbox-group::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
</style>
