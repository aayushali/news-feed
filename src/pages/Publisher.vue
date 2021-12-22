<template>
  <q-page padding>
    <!-- content -->
    <PublisherModel :confirm="confirm" @input="confirm = !confirm">
      <template v-slot:header>
        {{ title }}
      </template>
      <template v-slot:body>
        <q-input clearable filled color="secondary" :rules="[val => !!val || 'Field is required']"
                 v-model="publisher.name" label="Publisher Name" style="width: 90%"/>
        <q-input filled clearable :rules="[val => !!val || 'Field is required']" v-model="publisher.email"
                 type="Publisher Email" style="width: 90%">
          <template v-slot:prepend>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input clearable filled color="secondary" :rules="[val => !!val || 'Field is required']"
                 v-model="publisher.reg_no" label="Registration No."
                 style="width: 90%"/>
        <q-input clearable filled color="secondary" :rules="[val => !!val || 'Field is required']"
                 v-model="publisher.url" label="Publisher URL" style="width: 90%"/>
        <q-separator spaced/>
        <div class="card">
          <div class="card-left">
            <q-item-label header>Contact Person Details</q-item-label>
            <q-input clearable filled color="secondary" v-model="publisher.contact_details.name" class="q-mb-sm"
                     label="Name"
                     style="width: 90%"/>
            <q-input clearable filled color="secondary" v-model="publisher.contact_details.email" class="q-mb-sm"
                     label="Email"
                     style="width: 90%">
              <template v-slot:prepend>
                <q-icon name="mail"/>
              </template>
            </q-input>
            <q-input
              filled
              clearable
              v-model="publisher.contact_details.mob_num"
              label="Mobile Number"
              mask="(###) ### - ####"
              unmasked-value
              hint="Mask: (###) ### - ####" style="width: 90%"
            />
          </div>
          <div class="card-right">
            <q-item-label header>Links
              <q-btn push color="primary" round icon="add" size="8px" @click="addLinkRow"/>
            </q-item-label>
            <template v-if="publisher.links.length">
              <div class="link-wrapper q-gutter-x-sm q-mb-sm" v-for="(link,index) in publisher.links" :key="index">
                <q-select
                  filled
                  v-model="link.type"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="options"
                  @filter="filterFn"
                  label="Select Type"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-input filled color="secondary" size="20px" label="Link" v-model="link.links_url"/>
                <div class="row justify-center items-center ">
                  <q-btn round color="negative" size="12px" icon="clear" v-if="index>0"
                         @click="publisher.links.splice(index,1)"/>
                </div>
              </div>
            </template>

          </div>
        </div>
      </template>
      <template v-slot:footer>
        <q-btn flat :label="buttonTitle" color="primary" v-close-popup @click="submit"/>
      </template>
    </PublisherModel>

    <!--    Delete Model-->
    <q-dialog v-model="deleteModel" persistent>
      <q-card class="q-pa-lg">
        <q-card-section class="row items-center">
          <q-avatar icon="person_remove" color="negative" text-color="white"/>
          <span class="q-ml-md text-uppercase">Are you sure want to do delete this user?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat class="bg-secondary" label="Cancel" color="white" v-close-popup/>
          <q-btn flat label="Confirm" class="bg-negative" color="white" v-close-popup @click="removePublisher"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn align="between" class="btn-fixed-width q-ml-md q-mt-md" color="accent" label="Create Publisher"
           icon="person_add"
           v-on:click="createPublisher()"/>
    <div class="q-pa-md">
      <q-table
        :separator="separator"
        inline
        class="my-sticky-header-table"
        title="Publishers"
        :data="publisherListWithIndex"
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
              {{ props.row.index }}
            </q-td>
            <q-td :props="props" key="pub_name">
              {{ props.row.pub_name }}
            </q-td>
            <q-td :props="props" key="pub_email">
              {{ props.row.pub_email }}
            </q-td>
            <q-td :props="props" key="pub_registration_no">
              {{ props.row.pub_registration_no }}
            </q-td>
            <q-td :props="props" key="pub_url">
              {{ props.row.pub_url }}
            </q-td>
            <q-td :props="props" key="pub_contact_details">
              {{ props.row.pub_contact_details }}
            </q-td>
            <q-td :props="props" key="created_at">
              {{ props.row.created_at }}
            </q-td>

            <q-td key="actions" :props="props" class="q-gutter-x-sm">
              <q-btn round color="secondary" icon="edit" size="8px" @click="updateTag(props.row)"/>
              <q-btn round color="negative" icon="delete" size="8px" @click="deleteTag(props.row.id)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import PublisherModel from "components/Modals/PublisherModel";
import {mapGetters} from "vuex";

const stringOptions = [
  'API', 'RSS FEED', 'CURL'
];
export default {
  name: 'Publisher',
  computed: {
    ...mapGetters("publisher", {
      publisherList: "getPublishers"
    }),
    publisherListWithIndex() {
      return this.publisherList.map((publisher, index) => {
        return {
          ...publisher,
          index: ++index,
          links: publisher.links.map(link => {
            return {
              type: link.Type,
              links_url: link.LinkURLs
            }
          })
        }
      })
    }
  },
  components: {PublisherModel},
  data() {
    return {
      model: null,
      options: stringOptions,
      confirm: false,
      filter: '',
      title: '',
      tagsList: [],
      publisherId: '',
      publisherDetail: '',
      currentTagDetails: '',
      modalTitle: '',
      buttonTitle: '',
      tag: '',
      publisher: {
        name: '',
        email: '',
        mobile_number: '',
        reg_no: '',
        url: '',
        contact_details: {
          name: '',
          mob_num: '',
          email: '',
        },
        links: [
          {
            type: '',
            links_url: '',
          }
        ]
      },
      tagId: '',
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
          name: 'pub_name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'pub_name',
          // format: val => `${val}`,
          sortable: true
        },
        {
          name: 'pub_email',
          align: 'center',
          label: 'Email',
          field: 'pub_email',
          sortable: true
        },
        {
          name: 'pub_registration_no',
          align: 'center',
          label: 'Registration No.',
          field: 'pub_registration_no',
          sortable: true
        },
        {
          name: 'pub_url',
          align: 'center',
          label: 'Publisher URL',
          field: 'pub_url'
        },
        // {
        //   name: 'pub_contact_details',
        //   align: 'center',
        //   label: 'Contact Details',
        //   field: 'pub_contact_details',
        //   sortable: true
        // },

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
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    removePublisher() {
      this.$store.dispatch("publisher/delete_publisher", this.publisherId);
    },
    updateTag(row) {
      const id = row.id
      console.log(row);
      this.publisher = {
        name: row.pub_name,
        email: row.pub_email,
        mobile_number: '',
        reg_no: row.pub_registration_no,
        url: row.pub_url,
        contact_details: row.pub_contact_details,
      };
      let index = this.publisherList.findIndex(item => item.id === id);

      this.publisherDetail = this.publisherListWithIndex[index];
      Object.assign(this.publisher, this.publisherDetail);
      this.publisherId = id;
      this.confirm = true;
      this.update = true;
      this.buttonTitle = 'Update';
      this.title = "Update Publisher";

    },
    createPublisher() {
      this.confirm = true;
      this.publisher = {
        name: '',
        email: '',
        mobile_number: '',
        reg_no: '',
        url: '',
        contact_details: {
          name: '',
          mob_num: '',
          email: '',
        },
        links: [
          {
            type: '',
            links_url: '',
          }
        ]
      },
        this.title = "Create New Publisher";
      this.buttonTitle = "Create";
      this.publisher.links = [
        {
          'type': '',
          'links_url': ''
        }
      ]
    },
    deleteTag(id) {
      this.publisherId = id;
      this.deleteModel = true;
    },

    submit() {
      console.log(this.publisher);
      this.$store.dispatch("publisher/create_publisher", this.publisher);
    },
    addLinkRow() {
      this.publisher.links.push({
        type: '',
        links_url: ''
      })
    }

  },
  mounted() {
    this.$store.dispatch("publisher/fetch_publishers");
  }
}
</script>

<style scoped>
.card {
  display: flex;
  width: 90%;
}

.card-left {
  width: 50%;
}

.link-wrapper {
  display: flex;
}

</style>
