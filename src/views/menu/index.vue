<template>
  <div>
    <div v-for="(item, index) in menu" :key="index">
      <router-link :to="{name: item.name}">{{item.title}}</router-link>
    </div>
  </div>
</template>
<script>
const menu = [{
  name: 'landing-page-management',
  title: '落地页列表',
  id: 1
},{
  name: 'landing-page-management',
  title: '落地页列表',
  id: 1
},{
  name: 'landing-page-management',
  title: '落地页列表',
  id: 1
},{
  name: 'landing-page-management',
  title: '落地页列表',
  id: 1
},{
  name: 'landing-page-management',
  title: '落地页列表',
  id: 1
}];
export default {
  data() {
    return {
      menu
    }
  }
};
</script>
