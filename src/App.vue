<template>
  <locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import LocaleProvider from "ant-design-vue/es/locale-provider";

export default {
  data() {
    return {
      locale: zhCN
    };
  },
  components: {
    LocaleProvider
  }
};
</script>
<style>
  #app {
    height: 100%;
  }
</style>
