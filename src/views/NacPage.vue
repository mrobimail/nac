<template>
  <div class="NacPage">
    <NacGameSettings
      v-if="!isStarted"
      @start="setStart"
    />
    
    <NacGame
      v-if="isStarted"
      :config="config"
      :playerList="playerList"
      @stop="() => isStarted = false"
    />
  </div>
</template>

<script>
import NacGameSettings from '@/components/NacGameSettings.vue';
import NacGame from '@/components/NacGame.vue';

export default {
  name: 'NacPage',
  components: {
    NacGameSettings,
    NacGame,
  },
  data () {
    return {
      isStarted: false,
      config: {},
      playerList: [],
    }
  },
  methods: {
    setStart(startModel) {
      this.config = startModel.config;
      this.playerList = startModel.playerList;
      this.isStarted = true;
    },
  },
};
</script>