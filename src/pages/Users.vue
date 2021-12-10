<template>
  <q-page>
    <UserModal v-bind:confirm="{confirm, createUserTitle}" @input="confirm = !confirm"  />
    <UserModal v-bind:confirm="{confirm, updateUser}" @input="confirm = !confirm"  />

    <!--     delete prompt-->
    <q-dialog v-model="deleteUser" persistent>
      <q-card class="q-pa-lg">
        <q-card-section class="row items-center">
          <q-avatar icon="person_remove" color="negative" text-color="white" />
          <span class="q-ml-md text-uppercase">Are you sure want to do delete this user?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat class="bg-secondary" label="Cancel" color="white" v-close-popup />
          <q-btn flat label="Confirm" class="bg-negative" color="white" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-btn align="between" class="btn-fixed-width q-ml-md" color="accent" label="Create user" icon="person_add"
           v-on:click="confirm = true"/>
    <div class="q-pa-md">
      <q-table
        :separator="separator"
        inline
        class="my-sticky-header-table"
        title="Users"
        :data="data"
        :columns="columns"
        flat
        bordered
      >
      <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td key="actions" :props="props" class="q-gutter-x-sm">
            <q-btn round color="secondary" icon="edit" size="8px" @click="confirm=true"/>
            <q-btn round color="negative" icon="delete" size="8px"  @click="deleteUser=true" />
          </q-td>
          <q-td :props="props" key="id">
            {{ props.row.id }}
          </q-td>
          <q-td :props="props" key="name">
            {{ props.row.name }}
          </q-td>
          <q-td :props="props" key="email">
            {{ props.row.email }}
          </q-td>
          <q-td :props="props" key="mobile_number">
            {{ props.row.mobile_number }}
          </q-td>
          <q-td :props="props" key="address">
            {{ props.row.address }}
          </q-td>
          <q-td :props="props" key="email_verified_at">
            {{ props.row.email_verified_at }}
          </q-td>
          <q-td :props="props" key="password">
            {{ props.row.password }}
          </q-td>
          <q-td :props="props" key="created_at">
            {{ props.row.created_at }}
          </q-td>
          <q-td :props="props" key="updated_at">
            {{ props.row.updated_at }}
          </q-td>
        </q-tr>
      </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import {axiosInstance} from "boot/axios";
import UserModal from "components/UserModal";
export default {
  name: "users",
  components: {UserModal},
  data() {
    return {
      separator: 'vertical',
      createUserTitle: 'Create New User',
      updateUser: 'Update User Info',
      deleteUser: false,
      confirm: false,
      isPwd: true,
      columns: [{
        name: 'actions',
        label: 'Actions',
        align: 'center'
      },
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
        {
          name: 'mobile_number',
          align: 'center',
          label: 'Mobile Number',
          field: 'mobile_number',
          sortable: true
        },
        {
          name: 'address',
          label: 'Address',
          field: 'address',
          sortable: true,
          align: 'center'
        },
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
      data: undefined
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
