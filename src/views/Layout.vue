<template>
  <div id="top" class="anchor"></div>
  <div class="mdui-appbar mdui-appbar-fixed mdui-color-theme">
    <div class="mdui-toolbar mdui-color-theme mdui-container" style="position: relative">
      <router-link :to="{path: '/'}" class="mdui-typo-headline">OLAINDEX</router-link>
      <div class="mdui-toolbar-spacer"></div>
      <div v-show="display_image" class="image" mdui-tooltip="{content: '图床'}">
        <router-link :to="{name: 'Image'}" tag="div" class="mdui-btn mdui-btn-icon">
          <i class="mdui-icon material-icons">insert_photo</i>
        </router-link>
      </div>

      <!-- <div v-show="display_switch" class="switch-view mdui-p-a-2">
        <label class="mdui-switch" mdui-tooltip="{content: '切换视图'}">
          <i class="mdui-icon material-icons">view_comfy</i> &nbsp;&nbsp;
          <input id="display-type-chk" class="display-type" type="checkbox" />
          <i class="mdui-switch-icon"></i>
        </label>
      </div> -->
    </div>
  </div>
  <router-view />
  <a
    id="scrolltop"
    class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"
    :class="{'mdui-fab-hide': display_anchor}"
    @click="toTop()"
    ><i class="mdui-icon material-icons">keyboard_arrow_up</i></a
  >
</template>
<script>
import {defineComponent, watchEffect, ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {in_array} from '/@/utils/index'
export default defineComponent({
  name: 'Layout',
  setup() {
    const route = useRoute()
    const display_switch = ref(false)
    const display_anchor = ref(true)
    const display_image = ref(true)
    watchEffect(() => {
      if (in_array(route.name, ['Home', 'List'])) {
        display_switch.value = true
      } else {
        display_switch.value = false
      }
      if (in_array(route.name, ['Image'])) {
        display_image.value = false
      } else {
        display_image.value = true
      }
    })
    const handleScroll = () => {
      display_anchor.value = !(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
    }
    const toTop = () => {
      document.querySelector('#top').scrollIntoView({behavior: 'smooth', block: 'start'})
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    return {display_switch, display_anchor, display_image, toTop}
  },
})
</script>
<style scoped>
.anchor {
  display: block;
  position: relative;
  top: -64px;
  visibility: hidden;
}
</style>
