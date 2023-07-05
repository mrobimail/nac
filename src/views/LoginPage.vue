<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6" lg="4" xl="4">

      <ValidationObserver ref="observer">
        <v-form ref="login" @submit.prevent="login">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-spacer></v-spacer>
              <v-toolbar-title>Noughts And Crosses (NAC) v3</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="Felhasználónév" rules="required">
                    <v-text-field
                      label="Felhasználónév"
                      name="username"
                      v-model="form.username"
                      autocomplete="off"
                      :error-messages="errors"
                      :persistent-placeholder="autofilled"
                      @animationstart="checkAnimation"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="Jelszó" rules="required">
                    <v-text-field
                      label="Jelszó"
                      name="password"
                      v-model="form.password"
                      autocomplete="off"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      :error-messages="errors"
                      :persistent-placeholder="autofilled"
                      @animationstart="checkAnimation"
                    />
                  </ValidationProvider>
                </v-col>
                  <v-col cols="12" class="text-center">
                    <v-alert v-if="isError" icon="mdi-alert-circle" type="error">
                      A megadott Felhasználónév vagy Jelszó nem megfelelő!
                    </v-alert>
                    <v-btn color="primary" @click="login">Bejelentkezés</v-btn>
                  </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </ValidationObserver>

    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showPassword: false,
      autofilled: false,
      isError: false,
      defaultConfig: {
        username: 'User',
        password: 'User123'
      },
    };
  },
  methods: {
    login() {
      this.$refs.observer.validate().then((isValid) => {
        if (isValid) {
          if (this.form.username === this.defaultConfig.username && this.form.password === this.defaultConfig.password) {
            this.$session.set('loginStatus', true);
            this.$router.push({ name: 'NacPage' });
          } else {
            this.isError = true;
          }
        }
      });
    },
    checkAnimation(e) {
      if (e.animationName === 'onAutoFillStart') {
        this.autofilled = true;
      } else if (e.animationName === 'onAutoFillCancel') {
        this.autofilled = false;
      }
    },
  },
};
</script>
<style>
  :-webkit-autofill {
    transition: background-color 99999s ease-out 0s;
    animation-name: onAutoFillStart;
  }
  :not(:-webkit-autofill) {
    animation-name: onAutoFillCancel;
  }
  @keyframes onAutoFillStart {
    from {
      -webkit-transition: background .5s ease-out;
      -moz-transition: background .5s ease-out;
      -o-transition: background .5s ease-out;
      transition: background .5s ease-out;
    }
    to {
      -webkit-transition: background .5s ease-out;
      -moz-transition: background .5s ease-out;
      -o-transition: background .5s ease-out;
      transition: background .5s ease-out;
    }
  }
  @keyframes onAutoFillCancel {
    from {
      -webkit-transition: background .5s ease-out;
      -moz-transition: background .5s ease-out;
      -o-transition: background .5s ease-out;
      transition: background .5s ease-out;
    }
    to {
      -webkit-transition: background .5s ease-out;
      -moz-transition: background .5s ease-out;
      -o-transition: background .5s ease-out;
      transition: background .5s ease-out;
    }
  }
</style>