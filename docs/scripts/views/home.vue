<template>
  <div class="page--home">
    <h2>Hello VEditor</h2>
    <v-editor></v-editor>
    <ui-markdown :text="docs"></ui-markdown>
    <ui-snippet :code="code"></ui-snippet>
  </div>
</template>

<script>
const docs = require(`@/docs/demo.md`);
const code = require(`@/snippets/demo.md`);

export default {
  name: 'Home',
  data() {
    return {
      docs,
      code
    };
  }
};
</script>
