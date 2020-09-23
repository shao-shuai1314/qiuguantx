<template>
  <!-- 主场球路-->
  <div style="height:130px;"
       width="1160px"
       :id="ids">

  </div>
  <!-- ----------------------------------------------------------? -->
</template>
<script >
// 导入 1. echarts
import echarts from 'echarts'
export default {
  data () {
    return {

    };
  },
  props: ["ids", 'myChart1_Ylist', 'homeScheduleLength', 'lengths', 'jLlint'],
  async created () {

  },
  mounted () {
    // console.log(this.jLlint, '111')
    try {
      this.OnListG()
    }
    catch (err) {
      // console.log(err)
    }
  },

  methods: {


    OnListG () {


      // 3基于准备好的dom，初始化echarts实例

      var myChart = {}

      for (let i = 0; i <= this.lengths.length; i++) {
        myChart[`myChart${i}`] = echarts.init(document.getElementById(`main${i}`))
        document.getElementById(`main${i}`).style.width = 1160 - Math.floor(1160 / (this.homeScheduleLength[i].length - 1)) + 'px';
        myChart[`myChart${i}`].resize();
        if (this.jLlint) {
          this.aa(myChart[`myChart${i}`], this.homeScheduleLength[i], this.myChart1_Ylist[i], this.jLlint[`jLlint${i}`])
        } else {
          this.aa(myChart[`myChart${i}`], this.homeScheduleLength[i], this.myChart1_Ylist[i])
        }

      }



      // 设置长度
      // td长度
      // console.log((1160 / (res.data.allSchedule.homeSchedule.length + 1)).toFixed(2))
      // let tdLengthZ = 1160 - Math.floor(1160 / (this.lengths.length - 1))
      // for (let i = 0; i <= this.lengths.length; i++) {
      //   document.getElementById(`main${i}`).style.width = tdLengthZ + 'px';
      //   myChart[`myChart${i}`].resize();
      // }



    },

    // 图表
    aa (echarts_name, lunci, Ylist, jiaolianList) {

      //4. 指定图表的配置项和数据
      var option = {
        // 标题
        // title: {
        //   text: '一天用电量分布',
        //   subtext: '纯属虚构'
        // },
        // 鼠标移动效果
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross'
        //   }
        // },
        // 是否有下载标示
        // toolbox: {
        //   show: true,
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        // 固定高度
        "grid": { "left": "-10px", "right": "10px", "bottom": "10px", "containLabel": true, "height": 100, },
        // x设置
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: lunci
        },
        // y设置
        yAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: { show: true },
          axisLine: { onZero: false },
          axisLine: { show: false },
          axisTick: { show: false },
          data: [0, 1, 2]
        },
        // visualMap: {
        //   show: false,
        //   dimension: 0,
        //   pieces: [{
        //     lte: 2,
        //     color: 'green'
        //   }, {
        //     gt: 3,
        //     lte: 4,
        //     color: 'red'
        //   }]
        // },
        series: [
          {
            type: 'line',
            data: Ylist,
            symbol: 'none',
            symbolSize: 10,

            itemStyle: {
              borderColor: '#000',
              color: '#000'
            },
            markArea: {
              data: jiaolianList
            }
          }
        ]
      };
      //5. 使用刚指定的配置项和数据显示图表。
      echarts_name.setOption(option);
      echarts_name.on("click", function (e) {
        if (e.data.url) {

          window.open(`http://qiuguantx.com/soccer/team/player/${e.data.url}`)
          window.isCancel = true;
        }

      })
    }

  }
}
</script>
<style lang = 'less' scoped >
table {
  border: 1px solid #689ede;
  text-align: center;
  color: #474747;
  border-collapse: separate;
  background-color: #ebf8ff;
}
tr {
  background-color: #ebf8ff;
  font-size: 12px;
}
.qiululist td {
  /* text-align: center; */
  word-wrap: break-word;
  white-space: normal;
}
td,
th {
  height: 27px;
  line-height: 27px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: normal;
  /* border-left: 1px solid #73b1ec; */
  border-bottom: 1px solid #d5e4f5;
  border-top: 1px solid #d5e4f5;
}
td {
  width: 30px;
  &:hover .ss {
    display: block;
  }
}
td div {
  margin: 0 auto;
  width: 13px;
  word-wrap: break-word;
  white-space: normal;
  line-height: 15px;
  padding: 10px 0;
}
.spf {
  height: 106px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 18px;
}
.sz {
  width: 8px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  font-size: 12px;
  word-wrap: break-word;
}
.sss {
  position: relative;
}
.ss {
  word-wrap: normal;
  width: 100px;
  padding: 6px 10px;
  position: absolute;
  top: 40%;
  left: 10px;
  border: 1px solid #689ede;
  background: #eee;
  display: none;
  z-index: 999;
}
</style>