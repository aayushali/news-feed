<template>
  <q-page padding>
    <TagModel @input="confirm = !confirm" v-bind:confirm="{confirm, currentTagDetails , createTagTitle, buttonText, tagId}"
              :current-tag-details="currentTagDetails"/>
    <!-- content -->
    <q-dialog v-model="deleteModel" persistent>
      <q-card class="q-pa-lg">
        <q-card-section class="row items-center">
          <q-avatar icon="person_remove" color="negative" text-color="white"/>
          <span class="q-ml-md text-uppercase">Are you sure want to do delete this user?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat class="bg-secondary" label="Cancel" color="white" v-close-popup/>
          <q-btn flat label="Confirm" class="bg-negative" color="white" v-close-popup @click="removeTag"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn align="between" class="btn-fixed-width q-ml-md q-mt-md" color="accent" label="Create Tag" icon="add"
           v-on:click="createTag(tag)"/>
    <div class="q-pa-md">
      <q-table
        :separator="separator"
        inline
        class="my-sticky-header-table"
        title="Tags"
        :data="tagsListWithIndex"
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
            <q-td :props="props" key="tag_name">
              {{ props.row.tag_name }}
            </q-td>
            <q-td :props="props" key="tag_type">
              {{ props.row.tag_type }}
            </q-td>
            <q-td :props="props" key="created_at">
              {{ props.row.created_at }}
            </q-td>
            <q-td key="actions" :props="props" class="q-gutter-x-sm">
              <q-btn round color="secondary" icon="edit" size="8px" @click="updateTag(props.row.id)"/>
              <q-btn round color="negative" icon="delete" size="8px" @click="deleteTag(props.row.id)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import TagModel from "components/Modals/TagsModel";
export default {
  components: {TagModel},
  computed: {
    ...mapGetters("tags", {
      tagsList: "getTags",
    }),
    tagsListWithIndex() {
      return this.tagsList.map((tag, index) => {
        return {
          ...tag,
          index: ++index
        }
      })
    }
  },
  data() {
    return {
      filter: '',
      currentTagDetails: '',
      confirm: false,
      createTagTitle:'',
      buttonText:'',
      tag: '',
      count: 1,
      tagId: '',
      separator: 'vertical',
      deleteModel: false,
      columns: [
        {
          name: 'id',
          required: true,
          label: 'S.N',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'tag_name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'tag_name',
          // format: val => `${val}`,
          sortable: true
        },
        {
          name: 'tag_type',
          align: 'center',
          label: 'Type',
          field: 'tag_type',
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
      ],
    }
  },
  mounted() {
    this.fetch_tags();
  },
  methods: {
    ...mapActions("tags", ["fetch_tags"]),
    updateTag(id) {
      this.tagDetails = this.$store.state.tags.tags[id];
      let index = this.tagsList.findIndex(item => item.id === id);
      this.currentTagDetails = this.tagsList[index];
      this.tagId = id;
      this.createTagTitle = "Update Tag";
      this.buttonText = "Update";
      this.confirm = true;
    },
    deleteTag(id) {
      this.tagId = id;
      this.deleteModel = true;
    },
    removeTag() {
      this.$store.dispatch("tags/delete_tag", this.tagId)
    },
    createTag() {
      this.createTagTitle = "Create New Tag",
        this.buttonText = "Add Tag";

      this.confirm = true;
    }
  }
}
</script>
