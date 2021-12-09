<template>
<!--  <q-dialog v-model="value" persistent>-->
<!--    <q-card>-->
<!--      <q-card-section class="row items-center">-->
<!--        <q-avatar icon="signal_wifi_off" color="primary" text-color="white"/>-->
<!--        <span class="q-ml-sm">You are currently not connected to any network.</span>-->
<!--      </q-card-section>-->

<!--      <q-card-actions align="right">-->
<!--        <q-btn flat label="Cancel" color="primary" v-close-popup/>-->
<!--        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup/>-->
<!--      </q-card-actions>-->
<!--    </q-card>-->
<!--  </q-dialog>-->
  <q-dialog v-model="value" persistent class="dialog-box-wrapper" >

    <q-card style="min-width: 600px">
      <q-bar>
        <q-icon name="addPerson" />
        <div>Create New User</div>
        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="column items-center q-gutter-y-md " >
        <q-input clearable filled color="secondary" v-model="user.name" label="Full name" style="width: 100%" />
        <q-input v-model="user.password" color="secondary" filled :type="isPwd ? 'password' : 'text'" label="Password" style="width: 100%" >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup/>
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "UserModal",
  props: ['confirm'],
  data() {
    return {
      isPwd: true,


      user: {
        name: '',
        password: '',
      },
      computed : {
        value: this.confirm,
      }
    },

    console.log(confirm)

  }
}
</script>
