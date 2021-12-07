<template>
  <div class="column justify-center items-center wrapper">
    <div class="container-form bg-grey-2 q-pa-lg q-gutter-x-lg">
      <q-btn class="text-primary" to="/">Back to Login</q-btn>
      <h3 class="text-primary text-center">Create a new account</h3>
      <q-input
        type="text"
        filled
        v-model="name"
        label="Full Name"
        :rules="[val => !!val || 'Name is required']"
      />
      <q-input
        type="text"
        filled
        v-model="email"
        label="Email address"
        :rules="[val => !!val || 'Email is required']"
      />
      <!--      <q-input outlined v-model="name" label="Full Name" class="q-pb-lg" />-->
      <q-input   v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password" :rules="[val => !!val || 'Password is required']">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input  v-model="confirmPassword" filled :type="isPwd ? 'password' : 'text'" label="Confirm Password" :rules="[val => val == password || 'Password do not match']" >

        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="row justify-center items-center q-gutter-x-md">
        <q-btn color="primary" label="Register" @click="onRegister" />
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      isPwd: true,
    }
  },
  methods: {
    async onRegister() {
      const res = await axios(
        {
          method: 'post', //you can set what request you want to be
          url: 'http://127.0.0.1:8000/api/auth/signup',
          data: {
            name:this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword
          },
          headers: {
            'X-Requested-With': XMLHttpRequest,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(res);
      if ( res?.status === 201 ){
        alert("User successfully created");
      }else {
        alert("Couldn't create user. Try again")
      }
    }
  }


}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
}

.container-form {
  min-width: 600px;
}

</style>
