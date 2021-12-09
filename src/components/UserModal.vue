<template>
  <q-dialog v-model="value" persistent class="dialog-box-wrapper">
    <q-card style="min-width: 600px">
      <q-bar class="bg-primary q-py-lg">
        <q-icon name="person_add"/>
        <div>Create New User</div>
        <q-space/>
        <q-btn dense flat color="negative" rounded icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="column items-center q-gutter-y-md ">
        <q-input clearable filled color="secondary" v-model="user.fullname" label="Full name" style="width: 90%"/>
        <q-input v-model="user.pass" color="secondary" filled :type="isPwd ? 'password' : 'text'" label="Password"
                 style="width: 90%">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input filled clearable v-model="user.emailId" type="email" style="width: 90%">
          <template v-slot:prepend>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input
          filled
          clearable
          v-model="user.mobile_num"
          label="Phone"
          mask="(###) ### - ####"
          unmasked-value
          hint="Mask: (###) ### - ####" style="width: 90%"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" v-close-popup/>
        <q-btn flat label="Create User" color="primary" v-close-popup/>
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
        fullname: '',
        pass: '',
        emailId: '',
        mobile_num: '',
        add: ''
      }
    }
  },
  computed: {
    value: {
      get() {
        return this.confirm;
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
