<template>
  <q-dialog v-model="value" persistent class="dialog-box-wrapper">
    <q-card style="min-width: 600px">
      <q-bar class="bg-primary q-py-lg">
        <q-icon name="person_add"/>
        <div>{{ title }}</div>
        <q-space/>
        <q-btn dense flat color="negative" rounded icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="column items-center q-gutter-y-md ">
        <q-input clearable filled color="secondary" v-model="user.name" label="Full name" style="width: 90%"/>
        <q-input v-model="user.password" color="secondary" filled :type="isPwd ? 'password' : 'text'" label="Password"
                 style="width: 90%">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input clearable filled color="secondary" v-model="user.address" label="Address" style="width: 90%"/>
        <q-input filled clearable v-model="user.email" type="email" style="width: 90%">
          <template v-slot:prepend>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input
          filled
          clearable
          v-model="user.mobile_number"
          label="Phone"
          mask="(###) ### - ####"
          unmasked-value
          hint="Mask: (###) ### - ####" style="width: 90%"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-pr-xl q-pb-md">
        <q-btn flat label="Cancel" color="negative" v-close-popup/>
        <q-btn flat :label="buttonTitle" color="primary" v-close-popup @click="submit"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "UserModal",

  props: ['confirm', 'createUserTitle', 'buttonText'],
  data() {
    return {
      isPwd: true,
      user: {
        name: '',
        password: '',
        email: '',
        mobile_number: '',
        address: ''
      }
    }
  },
  computed: {
    value: {
      get() {
        return this.confirm.confirm;
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    title() {
      return this.confirm.createUserTitle;
    },
    buttonTitle() {
      return this.confirm.buttonText;
    }
  },
  methods: {
    submit() {
      console.log(this.user);
      this.$store.dispatch('users/create_user', this.user);
    }
  }
}
</script>
