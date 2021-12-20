<template>
  <q-page>
    <UserModal v-bind:confirm="{confirm, createUserTitle, buttonText, userId, currentUserDetails}"
               @input="confirm = !confirm" :current-user-details="currentUserDetails"/>
    <!--     delete prompt-->
    <q-dialog v-model="deleteModel" persistent>
      <q-card class="q-pa-lg">
        <q-card-section class="row items-center">
          <q-avatar icon="person_remove" color="negative" text-color="white"/>
          <span class="q-ml-md text-uppercase">Are you sure want to do delete this user?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat class="bg-secondary" label="Cancel" color="white" v-close-popup/>
          <q-btn flat label="Confirm" class="bg-negative" color="white" v-close-popup @click="removeUser"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn align="between" class="btn-fixed-width q-ml-md q-mt-md" color="accent" label="Create User" icon="person_add"
           v-on:click="createUser(user)"/>
    <div class="q-pa-md">
      <q-table
        :separator="separator"
        inline
        class="my-sticky-header-table"
        title="Users"
        :data="data"
        :columns="columns"
        :filter="filter"
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
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
            <q-td :props="props" key="password">
              {{ props.row.password }}
            </q-td>
            <q-td :props="props" key="created_at">
              {{ props.row.created_at }}
            </q-td>
            <q-td key="actions" :props="props" class="q-gutter-x-sm">
              <q-btn round color="secondary" icon="edit" size="8px" @click="updateUser(props.row.id)"/>
              <q-btn round color="negative" icon="delete" size="8px" @click="deleteUser(props.row.id)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import {axiosInstance} from "boot/axios";
import UserModal from "components/Modals/UserModal";
import {mapGetters} from "vuex";

export default {
  name: "users",
  components: {UserModal},
  computed: {
    ...mapGetters("users", {
      data: "getUsers",
    }),

  },
  data() {
    return {
      filter: '',
      user: '',
      userId: '',
      currentUserDetails: '',
      separator: 'vertical',
      createUserTitle: '',
      buttonText: '',
      confirm: false,
      deleteModel: false,
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
          name: 'created_at',
          label: 'created_at',
          field: 'created_at',
          align: 'center',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center'
        },
      ],
    }
  },
  methods: {
    updateUser(id) {
      this.userDetails = this.$store.state.users.users[id];
      let index = this.data.findIndex(item => item.id === id);
      this.currentUserDetails = this.data[index];
      this.userId = id;
      this.createUserTitle = "Update User Info";
      this.buttonText = "Update";
      this.confirm = true;
    },
    createUser() {
      this.createUserTitle = "Create New User",
        this.buttonText = "Add User";
      this.confirm = true;
    },
    deleteUser(id) {
      this.userId = id;
      this.deleteModel = true;
    },
    removeUser() {
      this.$store.dispatch("users/delete_user", this.userId);
    },

  }
  ,
  mounted() {
    this.$store.dispatch("users/fetch_users");
  },

}
</script>
<style class="scoped">

</style>
