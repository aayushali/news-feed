<template>
  <q-page padding>
    <q-dialog v-model="deleteModel" persistent>
      <q-card class="q-pa-lg">
        <q-card-section class="row items-center">
          <q-avatar icon="person_remove" color="negative" text-color="white"/>
          <span class="q-ml-md text-uppercase">Are you sure want to do delete this user?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat class="bg-secondary" label="Cancel" color="white" v-close-popup/>
          <q-btn flat label="Confirm" class="bg-negative" color="white" v-close-popup @click="removeCategory"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn align="between" class="btn-fixed-width q-ml-md q-mt-md" color="accent" label="Create Category" icon="add"
           v-on:click="createCategory(category)"/>
    <div class="q-pa-md">
      <q-table
        :separator="separator"
        inline
        class="my-sticky-header-table"
        title="Tags"
        :data="categoryList"
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
            <q-td :props="props" key="category_name">
              {{ props.row.category_name }}
            </q-td>
            <q-td :props="props" key="category_type">
              {{ props.row.category_type }}
            </q-td>
            <q-td :props="props" key="created_at">
              {{ props.row.created_at }}
            </q-td>
            <q-td key="actions" :props="props" class="q-gutter-x-sm">
              <q-btn round color="secondary" icon="edit" size="8px" @click="updateCategory(props.row.id)"/>
              <q-btn round color="negative" icon="delete" size="8px" @click="deleteCategory(props.row.id)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: 'Categories',
  computed: {
    ...mapGetters("category", {
      categoryList: 'getCategories'
    })
  },

  data() {
    return {
      filter: '',
      currentTagDetails: '',
      confirm: false,
      createTagTitle: '',
      buttonText: '',
      tag: '',
      count: 1,
      categoryId: '',
      separator: 'vertical',
      deleteModel: false,
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
          name: 'category_name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'category_name',
          // format: val => `${val}`,
          sortable: true
        },
        {
          name: 'category_type',
          align: 'center',
          label: 'Type',
          field: 'category_type',
          sortable: true
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
      ]
    }
  },
  methods: {
    updateCategory() {

    },
    deleteCategory(id) {
      this.categoryId = id;
      this.deleteModel = true;
    },
    removeCategory() {
      this.$store.dispatch("category/delete_category", this.categoryId);
    },
    createTag() {
      this.confirm = true;
    }
  },
  mounted() {
    this.$store.dispatch("category/fetch_categories");
  },
}
</script>
<style>

</style>
