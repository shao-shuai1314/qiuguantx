<template>
  <div class="gWidth">
    <el-image v-if='subsClassID'
              :src="`http://qiuguantx.com/img/sclassCoach/${sclassID}_${subsClassID}_${matchSeason}.jpg`"></el-image>
    <el-image v-else
              :src="`http://qiuguantx.com/img/sclassCoach/${sclassID}_${matchSeason}.jpg`"></el-image>

  </div>
</template>
<script >
export default {
  data () {
    return {
      sclassID: sessionStorage.getItem('sclassID'),
      matchSeason: sessionStorage.getItem('matchSeason'),
      subsClassID: sessionStorage.getItem('subsClassID')
    };
  },
  created () {

  },
  methods: {
  }
}
</script>
<style lang = 'less' scoped >
.gWidth {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>