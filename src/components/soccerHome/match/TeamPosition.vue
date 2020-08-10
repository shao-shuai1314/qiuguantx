<template>
  <baidu-map :zoom="zoom"
             @ready="handler"
             style="height:800px;margin-top:20px"
             :scroll-wheel-zoom='true'>
  </baidu-map>
</template>
<script>
export default {
  name: 'TestBaiDu',
  data () {
    return {
      zoom: 13
    }
  },
  methods: {
    async handler ({ BMap, map }) {
      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/teamAddr/`);
      res.data.teamAddr_list.forEach((item, i) => {
        var point = new BMap.Point(item.longitude, item.latitude)
        var marker = new BMap.Marker(point)

        var team_list = [];
        item.team_list.forEach((team_info, tind) => {
          if (res.data.jump_team[0] == team_info.teamID || res.data.jump_team[1] == team_info.teamID) {
            team_list.push(`<a href='/#/soccer/team/information/${team_info.teamID}' style = 'color:red' target="_blank">${team_info.name_j}</a>`)
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          } else {
            team_list.push(`<a href='/#/soccer/team/information/${team_info.teamID}' target="_blank">${team_info.name_j}</a>`)
          }

        })

        var label = new BMap.Label(`${team_list.join('、')}<br/>${item.venues_name}`); // 该坐标点显示的文本信息与显示位置
        marker.setLabel(label); // 把文本信息设置到maker上 
        // 以下操作为根据需要默认不显示文本信息，鼠标经过坐标点是显示
        label.setStyle({  // 隐藏坐标点文本信息
          display: "block",
          marginTop: '30px',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        });
        if (i == 0) {
          map.centerAndZoom(point, 8)
        }



        map.addOverlay(marker);

      });

    }
  }
}
</script>
<style lang = 'less' >
BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}
</style>
