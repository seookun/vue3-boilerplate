<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/images/logo.png" />
    <hellow-world msg="Welcome to Your Vue3 Boilerplate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HellowWorld from '@/components/HellowWorld.vue';

export default defineComponent({
  name: 'HomePage',
  components: { HellowWorld },
});
</script>
