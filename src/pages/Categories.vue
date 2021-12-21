<template>
  <q-page padding>
    <CategoryModel v-bind:confirm="{confirm}" @input="confirm = !confirm">
      <template v-slot:header>
        {{ update  ? "Update category" : modelTitle }}
      </template>
      <template v-slot:body>
        <q-input clearable filled color="secondary" v-model="categoryDetail.category_name" label="Name"
                 style="width: 90%"/>
        <q-input v-model="categoryDetail.category_type" color="secondary" filled label="Category Type"
                 style="width: 90%">
        </q-input>
      </template>
      <template v-slot:footer>
        <q-btn flat :label="buttonTitle" color="primary" v-close-popup @click="submit"/>
      </template>
    </CategoryModel>
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
        :data="categoriesWithIndex"
        :columns="columns"
        :filter="filter"
        row-key="index"
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
              {{ props.row.index }}
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
import CategoryModel from "components/Modals/CategoryModel";

export default {
  name: 'Categories',
  components: {CategoryModel},
  computed: {
    ...mapGetters("category", {
      categoryList: 'getCategories'
    }),
    categoriesWithIndex(){
      return this.categoryList.map((category, index )=>{
        return {
          ...category,
          index: ++index
        }
      })
    }
  },

  data() {
    return {
      filter: '',
      modelTitle: 'Create Category',
      currentTagDetails: '',
      confirm: false,
      update: false,
      createTagTitle: '',
      buttonTitle: '',
      buttonText: '',
      category: '',
      categoryDetail: {
        'category_name': '',
        'category_type': ''
      },
      categoryId: '',
      separator: 'vertical',
      deleteModel: false,
      columns: [
        {
          name: 'id',
          required: true,
          label: 'S.N',
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
    updateCategory(id) {
      let index = this.categoryList.findIndex(item => item.id === id);
      this.categoryDetail = this.categoryList[index];
      this.categoryId = id;
      this.confirm = true;
      this.update = true;
      this.buttonTitle = 'Update';
    },
    deleteCategory(id) {
      this.categoryId = id;
      this.deleteModel = true;
    },
    removeCategory() {
      this.$store.dispatch("category/delete_category", this.categoryId);
    },
    createCategory() {
      this.categoryDetail.category_name = '';
      this.categoryDetail.category_type = '';
      this.confirm = true;
      this.buttonTitle = 'Add category';
    },
    submit() {
      if(this.buttonTitle === 'Update'){
        this.updateCategory(this.categoryId);
        this.$store.dispatch('category/update_category',[this.categoryDetail, this.categoryId] );
      }
      else {
        this.$store.dispatch('category/create_category', this.categoryDetail);
      }
    }
  },
  mounted() {
    this.$store.dispatch("category/fetch_categories");
  },
}
</script>
<style>

</style>
