<template>
  <q-dialog v-model="value" persistent class="dialog-box-wrapper">
    <q-card style="min-width: 600px">
      <q-bar class="bg-primary q-py-lg">
        <q-icon name="tag"/>
        <div>{{ TagTitle }}</div>
        <q-space/>
        <q-btn dense flat color="negative" rounded icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="column items-center q-gutter-y-md ">
        <q-input clearable filled color="secondary" v-model="tag.tag_name" label="Name" style="width: 90%"/>
        <q-input v-model="tag.tag_type" color="secondary" filled label="Tag Type"
                 style="width: 90%">
        </q-input>
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
  name: "TagsModel",
  props: ["confirm", 'currentTagDetails', 'createTagTitle', 'buttonText', 'tagId'],
  data() {
    return {
      tag: {
        tag_name: '',
        tag_type: '',
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
    buttonTitle(){
      return this.confirm.buttonText;
    },
    TagTitle(){
      return this.confirm.createTagTitle;
    },
    updateTagId(){
      return this.confirm.tagId;
    }
  },
  watch: {
    currentTagDetails(){
      this.tag = this.currentTagDetails
    }
  },
  methods: {
    submit() {
      if (this.buttonTitle === 'Update'){
        this.$store.dispatch('tags/update_tag',[this.tag, this.updateTagId] );
      }
      else {
        this.$store.dispatch('tags/create_tag', this.tag );
      }
      this.tag.tag_name = '';
      this.tag.tag_type = '';
    }
  },
}
</script>
