<template>
  <q-page>
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
        {name: 'address', label: 'Address', field: 'address', sortable: true},
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
