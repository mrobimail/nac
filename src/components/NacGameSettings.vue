<template>
  <div class="NacGameSettings">
    <ValidationObserver ref="observer">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <h2>Beállítások</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card outlined tile>
                    <v-card-text>
                      <v-row>
                        <v-col cols="6"><strong>Pálya mérete</strong></v-col>
                        <v-col cols="2">
                          <ValidationProvider v-slot="{ errors }" name="Szélesség X" rules="required|numeric|min_value:5|max_value:30">
                            <v-text-field
                              label="Szélesség X"
                              name="xLength"
                              v-model.trim="config.xLength"
                              autocomplete="off"
                              :error-messages="errors"
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="2">
                          <ValidationProvider v-slot="{ errors }" name="Magasság Y" rules="required|numeric|min_value:5|max_value:30">
                            <v-text-field
                              label="Magasság Y"
                              name="yLength"
                              v-model.trim="config.yLength"
                              autocomplete="off"
                              :error-messages="errors"
                            />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <h2>Játékosok</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card v-for="(player, index) in playerList" :key="index" class="mb-2" outlined tile>
                    <v-card-text>
                      <v-row align="center" justify="center">
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors }" name="Név" rules="required">
                            <v-text-field
                              label="Név"
                              name="playerName"
                              v-model.trim="player.playerName"
                              autocomplete="off"
                              :error-messages="errors"
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="2">
                          <v-select label="Ikon" v-model="player.iconName" :items="iconList" filled>
                            <template #item="{ item }">
                              <v-icon>{{ item }}</v-icon>
                            </template>
                            <template #selection="{ item }">
                              <v-icon :color="player.iconColor" small>{{ item }}</v-icon>
                            </template>
                          </v-select>
                        </v-col>
                        <v-col cols="2">
                          <v-select label="Szín" v-model="player.iconColor" :items="colorList" filled>
                            <template #item="{ item }">
                              <v-chip :color="item">{{ item }}</v-chip>
                            </template>
                            <template #selection="{ item }">
                              <v-chip :color="item" small>{{ item }}</v-chip>
                            </template>
                          </v-select>
                        </v-col>
                        <v-col cols="2" class="text-center">
                          <v-btn v-if="index > 1" color="error" @click="playerList.splice(index, 1)" small text>Törlés</v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn :disabled="playerList.length >= 10" @click="addNewPlayer">Új játékos hozzáadása</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-footer padless>
                <v-col cols="12" class="text-right">
                  <v-btn @click="start" color="primary" block>Start</v-btn>
                </v-col>
            </v-footer>
          </v-card>
        </v-col>
      </v-row>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'NacGameSettings',
  data () {
    return {
      config: {
        winNumber: 5,
        xLength: 10,
        yLength: 10,
      },
      playerList: [],
      iconList: [
        'mdi-close-thick',
        'mdi-checkbox-blank-circle-outline',
        'mdi-circle',
        'mdi-checkbox-blank',
        'mdi-triangle',
        'mdi-invert-colors',
        'mdi-heart',
        'mdi-emoticon',
        'mdi-cat',
        'mdi-car',
      ],
      colorList: [
        'blue',
        'red',
        'green',
        'yellow',
        'orange',
        'purple',
        'pink',
        'brown',
        'grey',
        'black',
      ],
    }
  },
  created() {
    this.addNewPlayer();
    this.addNewPlayer();
  },
  methods: {
    addNewPlayer() {
      const playerName = `Player ${this.playerList.length + 1}`;
      const iconName = this.iconList[this.playerList.length];
      const iconColor = this.colorList[this.playerList.length];

      this.playerList.push({ playerName, iconName, iconColor});
    },
    start() {
      this.$refs.observer.validate().then((isValid) => {
        if (isValid) {
          this.$emit('start', {
            config: this.config,
            playerList: this.playerList,
          });
        }
      });
    },
  },
};
</script>
