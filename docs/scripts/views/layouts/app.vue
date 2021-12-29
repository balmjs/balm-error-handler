<template>
  <div class="balmui-container">
    <!-- header -->
    <ui-top-app-bar
      class="balmui-head"
      content-selector=".balmui-body"
      nav-id="balmui-menu"
    >
      <router-link
        to="/"
        :class="['catalog-title', $theme.getThemeClass('on-primary')]"
      >
        Balm Tracking
      </router-link>
      <template #toolbar="{ itemClass }">
        <a :class="itemClass" href="https://github.com/balmjs/balm-scroll">
          <svg-github></svg-github>
        </a>
      </template>
    </ui-top-app-bar>
    <!-- content -->
    <main class="balmui-body">
      <ui-drawer
        v-model="open"
        type="dismissible"
        class="balmui-menu"
        nav-id="balmui-menu"
      >
        <ui-drawer-content>
          <ui-nav class="catalog-list">
            <template #default="{ itemClass }">
              <h3 :class="$theme.getTextClass('primary', 'light')">Guide</h3>
              <router-link
                :class="[itemClass, $theme.getTextClass('primary', 'light')]"
                to="/"
              >
                Introduction
              </router-link>
              <h3 :class="$theme.getTextClass('primary', 'light')">Demos</h3>
              <template v-for="(item, index) in menu">
                <router-link
                  :key="`item${index}`"
                  :class="[itemClass, $theme.getTextClass('primary', 'light')]"
                  :to="{ name: item.name }"
                >
                  {{ item.path }}
                </router-link>
              </template>
            </template>
          </ui-nav>
        </ui-drawer-content>
      </ui-drawer>

      <div :class="[$tt('body1'), 'balmui-content']">
        <div :class="$tt('body2')">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SvgGithub from '@/components/github';
import menu from '@/routes/demos';

export default {
  components: {
    SvgGithub
  },
  data() {
    return {
      menu,
      open: false
    };
  },
  computed: {
    noLayout() {
      return /^demos.*/.test(this.$route.name);
    }
  },
  mounted() {
    this.open = window.innerWidth >= 1024;

    window.addEventListener('balmResize', () => {
      this.open = window.innerWidth >= 1024;
    });
  }
};
</script>
