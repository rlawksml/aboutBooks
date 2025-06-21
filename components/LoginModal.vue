<template>
  <div class="q-pa-md">
    <q-dialog v-model="dialog" persistent>
      <q-tabs v-model="tab" class="text-teal">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="q-pa-md">
            <q-input v-model="input1" label="Dialog Input" />
            <q-input v-model="input2" label="Dialog Input 2" />
            <q-input v-model="input3" label="Dialog Input 3" />
            <q-btn label="Close" color="primary" @click="dialog = false" />
            <q-btn label="Submit" color="secondary" @click="dialog = false" />
          </div>
        </q-tab-panel>
        <q-tab-panel name="alarms">
          <div class="q-pa-md">
            <q-input v-model="input4" label="Dialog Input" />
            <q-input v-model="input5" label="Dialog Input 2" />
            <q-input v-model="input6" label="Dialog Input 3" />
            <q-btn label="Close" color="primary" @click="dialog = false" />
            <q-btn label="Submit" color="secondary" @click="dialog = false" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-dialog>
  </div>
</template>

<script setup>
    import { ref } from 'vue'
    const dialog = ref(false)
    const tab = ref('mails')
    const openLoginModal = () => {
        dialog.value = true
    }
    const closeLoginModal = () => {
        dialog.value = false
    }
    const submitLogin = () => {
        // 로그인 처리 로직
        closeLoginModal()
    }
    const cancelLogin = () => {
        closeLoginModal()
    }
    const handleTabChange = (newTab) => {
        tab.value = newTab
    }
    const handleInputChange = (value) => {
        // 입력값 변경 처리 로직
        console.log('Input changed:', value)
    }
    const handleSubmit = () => {
        // 제출 처리 로직
        console.log('Form submitted')
        closeLoginModal()
    }
    const handleCancel = () => {
        // 취소 처리 로직
        console.log('Form cancelled')
        closeLoginModal()
    }
    const handleDialogClose = () => {
        // 다이얼로그 닫기 처리 로직
        console.log('Dialog closed')
        closeLoginModal()
    }
    const handleDialogOpen = () => {
        // 다이얼로그 열기 처리 로직
        console.log('Dialog opened')
        openLoginModal()
    }
</script>

<style lang="scss" scoped>
</style>