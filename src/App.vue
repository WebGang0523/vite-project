<script setup lang="ts">
import request from "@/utils/request";
import {onMounted} from "vue";
import {reqLogin} from "@/api/user";
onMounted(()=>{
  reqLogin({
    username:'admin1',
    password:'123456'
  }).then((res)=>{console.log(res)},(err)=>{console.log(err)})
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
div{
  h1{
    color: $color;
  }
}
</style>
