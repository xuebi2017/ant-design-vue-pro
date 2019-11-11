<template>
  <div :class="{configuration: !collapsed, 'configuration-closed':collapsed}">
    <div class="config-menu">
      <span
        :class="{'config-text-light': theme === 'light', 'config-text-dark': theme === 'dark', 'hide': collapsed}"
      >整体风格:</span>
      <a-switch
        defaultChecked
        @change="changeTheme"
        checkedChildren="light"
        unCheckedChildren="dark"
      />
    </div>
    <div class="config-menu">
      <span
        :class="{'config-text-light': theme === 'light', 'config-text-dark': theme === 'dark', 'hide': collapsed}"
      >多页签模式:</span>
      <a-switch defaultChecked @change="changeMultiMode" checkedChildren="是" unCheckedChildren="否" />
    </div>
  </div>
</template>
<script>
export default {
  name: "configuration",
  data() {
    return {};
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: true
    },
    multiTab: {
      type: Boolean,
      required: false
    }
  },
  components: {},
  computed: {},
  methods: {
    changeTheme() {
      let theme = this.theme === "dark" ? "light" : "dark";
      this.$store.dispatch("ToggleTheme", theme);
    },
    changeMultiMode() {
      let multiTab = !this.multiTab;
      this.$store.dispatch("ToggleMultiTab", multiTab);
    }
  }
};
</script>
<style lang='less' scoped>
.configuration,
.configuration-closed {
  position: fixed;
  bottom: 20px;
  width: 256px;
  text-align: center;
}
.configuration-closed {
  width: 80px;
}
.config-text-dark {
  color: rgba(255, 255, 255, 0.65);
}
.config-text-light {
  color: rgba(0, 0, 0, 0.65);
}
.config-menu {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
}
</style>
