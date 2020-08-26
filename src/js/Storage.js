 function getConfig(){
   let timestamp =  localStorage.getItem("timestamp");

  //  当前时间
  var newTimestamp =`${Date.parse(new Date())}`.slice(0,10)

   let isTime = false

  if(newTimestamp >=  timestamp){
    isTime = true
    // localStorage.clear();
    localStorage.removeItem('token');
  }
 return isTime
}
 
 
//暴露的方法
//公开的方法
export default {
  getConfig:getConfig,//获取 公共配置方法
}