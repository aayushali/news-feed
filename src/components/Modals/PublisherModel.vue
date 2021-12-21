<template>
  <q-dialog v-model="value" persistent class="dialog-box-wrapper">
    <q-card style="min-width: 900px">
      <q-bar class="bg-primary q-py-lg">
        <q-icon name="category"/>
        <slot name="header"></slot>
        <q-space/>
        <q-btn dense flat color="negative" rounded icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="column items-center q-gutter-y-md ">
        <slot name="body">
        </slot>
      </q-card-section>
      <q-card-actions align="right" class="q-pr-xl q-pb-md">
        <q-btn flat label="Cancel" color="negative" v-close-popup/>
        <slot name="footer">

        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'PublisherModel',
  props: ['confirm'],
  computed: {
    value: {
      get() {
        return this.confirm;
      },
      set(value){
        this.$emit('input', value);
      }
    }
  }
}
</script>
