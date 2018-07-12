<template>
  <div>
      overview
  </div>
</template>
<script>
import { getLocalAuth } from '@/helpers/local_auth'
export default {
  mounted() {
    console.log(getLocalAuth(), '2');
  }
}
</script>
