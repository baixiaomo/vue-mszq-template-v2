<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '320px'
    },
    legendData: {
      type: Array,
      default: () => []
    },
    seriesData: {
      type: Array,
      default: () => []
    },
    seriesName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    seriesData(val) {
      this.initChart()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c}万元 ({d}%)',
          formatter: function(p) {
            return p.seriesName + ' <br/>' + p.name + ' : ' + formatNum(p.value) + '万元 (' + p.percent + '%)'
          }
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.legendData
        },
        series: [
          {
            name: this.seriesName,
            type: 'pie',
            radius: [15, 95],
            center: ['50%', '50%'],
            data: this.seriesData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}

function formatNum(data) {
  if (!data && data !== 0) return 0
  return data.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

</script>
