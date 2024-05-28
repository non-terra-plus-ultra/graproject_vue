<template>
    <div>
  <button @click="getPic">获取图片</button>
    <img :src="picurl" alt="beachball" />  
    </div>
</template>

<script>
 import Cookies from 'js-cookie'
    import API from "@/api";
    import qs from "qs";
    import axios from 'axios';
export default{
    
    data(){
        return{
             picurl: "",//图片url
        };
       

    },
    methods:{
            //从服务器获取图片
        //从服务器获取图片
        getPic() {
      var that = this;

      axios({
        method: "get",
        url: "http://127.0.0.1:8801/getPic",
        responseType: "arraybuffer", // 最为关键
      }).then(function (response) {
        that.picurl =
          "data:image/jpeg;base64," + that.arrayBufferToBase64(response.data);
      });
    },
    // ArrayBuffer转为base64字符串
    arrayBufferToBase64(buffer) {
      //第一步，将ArrayBuffer转为二进制字符串
      var binary = "";
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      //将二进制字符串转为base64字符串
      return window.btoa(binary);
    },

      
}
}
</script>
