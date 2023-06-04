<template>
  <div class="NacGame">
    <v-card flat>
      <v-toolbar color="#eeeeee" dense flat>
        <v-toolbar-title>
          {{ headerMessage }}
          <v-chip class="ma-2" color="white" :text-color="playerList[selectedPlayer].iconColor">
            <v-icon left :color="playerList[selectedPlayer].iconColor">
              {{ playerList[selectedPlayer].iconName }}
            </v-icon>
            {{ playerList[selectedPlayer].playerName }}
          </v-chip>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn @click="restartAndSettings">Beállítások</v-btn>
        <v-btn @click="restart" class="ml-3" color="primary">Újrakezdés</v-btn>
      </v-toolbar>
      <v-card-text class="scrollable">
        <v-row align="center" justify="center">
          <v-btn-toggle multiple>
            <table class="squareGrid">
              <tr v-for="y in Number(config.yLength)" :key="y">
                <td v-for="x in Number(config.xLength)" :key="x" :class="currentTileIsWinner(x, y) ? getTileBgColor(x, y) : 'text-center'">
                  <v-icon v-if="currentTileIsWinner(x, y) || isSelectTile(x, y)" :color="getTileIconColor(x, y)">
                    {{ getTileIconName(x, y) }}
                  </v-icon>
                  <v-hover v-else v-slot="{ hover }">
                    <v-btn @click="selectTile(x, y)" icon small :disabled="isWinner">
                      <v-icon v-if="hover" :color="playerList[selectedPlayer].iconColor">
                        {{ playerList[selectedPlayer].iconName }}
                      </v-icon>
                    </v-btn>
                  </v-hover>
                </td>
              </tr>
            </table>
          </v-btn-toggle>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NacGame',
  props: {
    config: {
      type: Object,
      required: true,
    },
    playerList: {
      type: Array,
    },
  },
  data () {
    return {
      selectedPlayer: 0,
      tileList: [],
      winnerTileList: [],
    }
  },
  computed: {
    isWinner() {
      return this.winnerTileList.length === Number(this.config.winNumber) ? true : false;
    },
    headerMessage() {
      return this.isWinner ? 'Gratulálunk! Te nyertél:' : 'Te következel:';
    },
  },
  methods: {
    setNextPlayer() {
      if (this.selectedPlayer + 1 < this.playerList.length) {
        this.selectedPlayer += 1;
      } else {
        this.selectedPlayer = 0;
      }
    },
    getPlayer(x, y) {
      const tile = this.tileList.find((tile) => x === tile.x && y === tile.y);
      return tile ? this.playerList[tile.playerIndex] : null;
    },
    getTileIconName(x, y) {
      const tile = this.getPlayer(x, y);
      return tile ? tile.iconName: null;
    },
    getTileIconColor(x, y) {
      const tile = this.getPlayer(x, y);
      return tile ? tile.iconColor : null;
    },
    getTileBgColor(x, y) {
      const tile = this.getPlayer(x, y);
      return tile ? `text-center ${tile.iconColor} ${tile.iconColor}--text lighten-5` : null;
    },
    isSelectTile(x, y) {
      return Boolean(this.getPlayer(x, y));
    },
    selectTile(x, y) {
      const tile = { x, y, playerIndex: this.selectedPlayer };
      this.tileList.push(tile);

      if (!this.isWinnerTile(tile)) {
        this.setNextPlayer();
      }
    },
    isWinnerTile(tile) {
      return this.tileList.length < (this.playerList.length * this.config.winNumber - (this.playerList.length - 1)) 
        ? false
        : this.checkToWinnerTile(tile, -1, -1)
        || this.checkToWinnerTile(tile, +1, -1)
        || this.checkToWinnerTile(tile, -1, 0)
        || this.checkToWinnerTile(tile, 0, -1);
    },
    checkToWinnerTile(tile, xDirection, yDirection) {
      let winnerArray = this.moveDirection(tile, xDirection, yDirection);
      winnerArray.push(tile);
      if (this.isWinnerTiles(winnerArray)) {
        this.winnerTileList = winnerArray;
      } else {
        winnerArray = this.moveDirection(tile, this.oppositeDirection(xDirection), this.oppositeDirection(yDirection), winnerArray);
        if (this.isWinnerTiles(winnerArray)) {
        this.winnerTileList = winnerArray;
        }
      }
      return this.isWinnerTiles(winnerArray);
    },
    moveDirection(initialTile, xMove, yMove, winnerTile = []) {
      let nextX = initialTile.x + xMove;
      let nextY = initialTile.y + yMove;
      let nextTile = null;

      for (let i = 0; i < Number(this.config.winNumber); i += 1) {
        nextTile = this.tileList.find((tile) => tile.x === nextX && tile.y === nextY && tile.playerIndex === initialTile.playerIndex);
        if (this.isWinnerTiles(winnerTile)) {
          break;
        } else if (nextTile) {
          winnerTile.push(nextTile);
          nextX = nextTile.x + xMove;
          nextY = nextTile.y + yMove;
        } else {
          break;
        }
      }
      return winnerTile;
    },
    currentTileIsWinner(x, y) {
      return this.isWinner && this.winnerTileList.find((tile) => tile.x === x && tile.y === y && tile.playerIndex === this.selectedPlayer);
    },
    oppositeDirection(number) {
      return number > 0 ? number * -1 : Math.abs(number);
    },
    isWinnerTiles(tiles) {
      return tiles.length === Number(this.config.winNumber);
    },
    restart() {
      this.selectedPlayer = 0;
      this.tileList = [];
      this.winnerTileList = [];
    },
    restartAndSettings() {
      this.restart();
      this.$emit('stop');
    },
  },
};
</script>

<style lang="scss">
$borderColor: #616161;

.scrollable {
  overflow: auto;
}

.squareGrid, .squareGrid td {
  border: 1px solid $borderColor;
  border-collapse: collapse;
}

.squareGrid td {
  width: 29px;
  height: 29px;
}

.squareGrid .black.lighten-5,
.squareGrid .red.lighten-5,
.squareGrid .blue.lighten-5,
.squareGrid .green.lighten-5,
.squareGrid .yellow.lighten-5,
.squareGrid .orange.lighten-5,
.squareGrid .pink.lighten-5,
.squareGrid .purple.lighten-5,
.squareGrid .brown.lighten-5,
.squareGrid .grey.lighten-5 {
  border-color: $borderColor !important;
}
</style>
