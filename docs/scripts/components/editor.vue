<template>
  <div :id="id" style="width: 100%"></div>
</template>

<script>
import loadVEditor from '@/config/editor';
import { createUid } from '@/utils';

export default {
  name: 'VEditor',
  data() {
    return {
      id: `veditor-${createUid()}`,
      UE: null,
      editor: null,
      contentValue: ''
    };
  },
  watch: {
    contentValue(value) {
      this.$emit('change', 'content', value);
    }
  },
  mounted() {
    loadVEditor((UE) => {
      this.UE = UE;

      this.editor = UE.getEditor(this.id);

      this.editor.addListener('ready', () => {
        this.initEditor();
      });
      this.editor.addListener('catchremotesuccess', () => {
        this.updateContent();
      });
    });
  },
  destroyed() {
    this.UE.delEditor(this.id);
  },
  methods: {
    updateContent() {
      setTimeout(() => {
        this.contentValue = this.editor.getContent();
      }, 1);
    },
    initEditor() {
      this.editor.setContent(this.contentValue);
      this.editor.body.addEventListener('input', (e) => {
        this.updateContent();
      });
    }
  }
};
</script>
