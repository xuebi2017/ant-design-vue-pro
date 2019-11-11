<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <!-- :style="{ color: '#fff' }"  -->
    <a-icon
      :class="{'trigger-close': collapsed,'trigger': !collapsed, 'fold-icon-style-dark': theme === 'dark'  }"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggle"
    />
    <s-menu :collapsed="collapsed" :menu="menus" :theme="theme" :mode="mode" @select="onSelect"></s-menu>
    <configuration :theme="theme" :collapsed="collapsed" :multiTab="multiTabMode"></configuration>
  </a-layout-sider>
</template>

<script>
import SMenu from "./index";
import { mixin, mixinDevice } from "@/utils/mixin";
import Configuration from "../tools/Configuration";

export default {
  name: "SideMenu",
  components: { SMenu, Configuration },
  mixins: [mixin, mixinDevice],
  data() {
    return {};
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    theme: {
      type: String,
      required: false,
      default: "light"
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    },
    multiTabMode: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
    toggle() {
      this.$emit("toggle");
    }
  }
};
</script>
<style lang="less" scoped>
.trigger {
  float: right;
}
.trigger-close {
  padding: 0 30px !important;
}
.fold-icon-style-dark {
  color: rgba(255, 255, 255, 0.65);
}
</style>
