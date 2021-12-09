<template>
  <q-page>
    <q-dialog v-model="confirm" persistent class="dialog-box-wrapper">
      <q-card style="min-width: 600px">
        <q-bar class="bg-primary q-py-lg" >
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
          <q-input filled clearable v-model="user.emailId" type="email"  style="width: 90%">
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
    <q-btn align="between" class="btn-fixed-width q-ml-md" color="accent" label="Create user" icon="person_add"
           v-on:click="confirm = true"/>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        title="Users"
        :data="data"
        :columns="columns"
        row-key="name"
        flat
        bordered
      />
    </div>

  </q-page>
</template>

<script>
import {axiosInstance} from "boot/axios";

export default {
  name: "users",
  data() {
    return {
      confirm: false,
      user: {
        fullname: '',
        pass: '',
        emailId: '',
        mobile_num: '',
        add: ''
      },
      isPwd: true,
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Full name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'Email Address',
          field: 'email',
          sortable: true
        },
        {name: 'mobile_number', align: 'center', label: 'Mobile Number', field: 'mobile_number', sortable: true},
        {name: 'address', label: 'Address', field: 'address', sortable: true, align: 'center'},
        {
          name: 'email_verified_at',
          label: 'email_verified_at',
          align: 'center',
          field: 'email_verified_at',
          sortable: true
        },
        {
          name: 'password',
          label: 'Password',
          align: 'center',
          field: "password",
        },
        {
          name: 'created_at',
          label: 'created_at',
          field: 'created_at',
          align: 'center',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'updated_at',
          label: 'Updated_at',
          field: 'updated_at',
          align: 'center',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: undefined,
    }

  }
  ,
  mounted() {
    axiosInstance.get('/api/users')
      .then(res => {
        console.log(res.data.data)
        this.data = res.data.data;
      });

  }
}
</script>
<style class="scoped">

</style>
