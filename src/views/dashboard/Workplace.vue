<template>
  <page-view :title="false">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ user.name }}
        <span class="welcome-text">，{{ welcome }}</span>
      </div>
      <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="项目" content="56" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="团队排名" content="8/24" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="8">
          <head-info title="项目数" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>
<script>
import { timeFix } from "@/utils";
import { PageView } from "@/layouts";
import { mapState } from 'vuex'
import HeadInfo from '@/components/tools/HeadInfo'

export default {
  name: "Workplace",
  data() {
    return {
      timeFix: timeFix(),
      user: {}
    };
  },
  props: {},
  components: {
    PageView,
    HeadInfo
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  created() {
    this.user = this.userInfo;
    this.avatar = this.userInfo.avatar;
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
</style>
