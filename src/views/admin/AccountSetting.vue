<template>
  <div class="mdui-container mdui-m-y-5">
    <div class="mdui-typo">
      <h1>账号设置</h1>
    </div>
    <form>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="type">类型</label>
        <input :value="accountType(model.type)" type="text" class="mdui-textfield-input" readonly name="type" />
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="remark">标识</label>
        <input v-model="model.remark" type="text" class="mdui-textfield-input" name="remark" />
        <div class="mdui-textfield-helper">标识用于前台显示</div>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="root">起始目录</label>
        <input v-model="config.root" type="text" class="mdui-textfield-input" name="root" />
        <div class="mdui-textfield-helper">用于设定显示起始目录</div>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="hide">隐藏文件</label>
        <textarea v-model="config.hide" class="mdui-textfield-input" rows="4" name="hide"></textarea>
        <div class="mdui-textfield-helper">标记的文件、文件夹前台不显示，使用"|"隔开，分隔符为英文符号</div>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="encrypt">加密文件</label>
        <textarea v-model="config.encrypt" class="mdui-textfield-input" rows="4" name="encrypt"></textarea>
        <div class="mdui-textfield-helper">
          加密的文件、文件夹需要密码访问，形式"目录:密码"，使用"|"隔开，分隔符为英文符号
        </div>
      </div>

      <button class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right" @click.prevent="handleSubmit()">
        <i class="mdui-icon material-icons">check</i> 保存
      </button>
      <router-link :to="{name: 'Account'}" class="mdui-btn mdui-color-indigo mdui-ripple mdui-float-right"
        ><i class="mdui-icon material-icons">arrow_back</i> 返回</router-link
      >
    </form>
  </div>
</template>
<script>
import {defineComponent, reactive, computed, onMounted, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mdui from 'mdui'
import {view, update, fetchConfig, updateConfig} from '/@/api/account'
import {defaultValue} from '/@/utils/index'
export default defineComponent({
  name: 'AccountSetting',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      model: {
        id: 0,
        remark: '标识',
        type: 0,
      },
      config: {
        id: 0,
        hide: '',
        encrypt: '',
      },
    })
    const id = computed(() => defaultValue(route.params.id, 0))
    const accountType = (type) => {
      const map = {
        0: '分享版',
        1: '世纪互联',
        2: '通用版',
      }
      return map[type]
    }
    const handleSubmit = async () => {
      data.config.id = id.value
      await update(data.model).then((res) => {
        console.log(res)
      })
      await updateConfig(data.config).then((res) => {
        console.log(res)
      })
      mdui.snackbar({
        message: ':) 保存成功！',
        timeout: 2000,
        position: 'right-top',
      })
      mdui.updateTextFields()
    }
    onMounted(async () => {
      await view({params: {id: id.value}}).then((res) => {
        data.model = res.data
      })
      await fetchConfig({params: {id: id.value}}).then((res) => {
        data.config = defaultValue(res.data, {})
      })
      mdui.mutation()
    })
    return {...toRefs(data), accountType, handleSubmit}
  },
})
</script>
