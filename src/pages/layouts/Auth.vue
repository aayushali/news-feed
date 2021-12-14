<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
        <!-- Wrapping only one DOM element, defined by QBtn -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: "Auth",
};
</script>
