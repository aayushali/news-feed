 <template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated className="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-toolbar-title>
          <q-avatar >
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="" >
          </q-avatar>
          News Feed
        </q-toolbar-title>
        <q-btn color="negative" icon="logout" label="Logout" @click="logout" />
      </q-toolbar>


    </q-header>

      <q-drawer
        v-model="left"
        show-if-above
        :width="400"
        :breakpoint="600"
        side="left" bordered
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="people" />
              </q-item-section>
              <q-item-section  clickable >

              <router-link to="/users" >
                    User Management
                </router-link>
              </q-item-section>

            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="sell" />
              </q-item-section>

              <q-item-section>
                <router-link to="/tags">Tags</router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="category" />
              </q-item-section>

              <q-item-section>
                Categories
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold " >Welcome {{ userDetails.name }}</div>
            <div>{{  userDetails.address }}</div>
          </div>
        </q-img>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import {mapGetters} from "vuex";
export default {
computed: {
...mapGetters("auth", {
    userDetails: "user"
  }),
},

  data() {
    return {
      left: false
    }
  },
  methods: {
    logout(){
      this.$store.dispatch("auth/logout");
    }
  }
}
</script>

 <style>
 a {
   text-decoration: none;
   color: black;
 }
 </style>
