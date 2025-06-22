<template>
  <div class="q-pa-md">
    <q-dialog v-model="loginStore.isLoginModalOpen" persistent>
      <div class="dialog">
        <q-tabs v-model="tab" class="text-teal bg-white" active-color="primary" indicator-color="primary"
          align="justify" narrow-indicator>
          <q-tab name="login" icon="mail" label="로그인" />
          <q-tab name="signUp" icon="alarm" label="회원가입" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="">
          <q-tab-panel name="login">
            <div class="q-pa-md">
              <LoginComp :onClose="closeModal" />
            </div>
          </q-tab-panel>
          <q-tab-panel name="signUp">
            <div class="q-pa-md">
              <SignupComp :onClose="closeModal" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import useLoginStore from '~/stores/login'
import SignupComp from './login/SignupComp.vue'


const $q = useQuasar()

const tab = ref('login')
const loginStore = useLoginStore()

const closeModal = () => {
  loginStore.closeLoginModal()
  tab.value = 'login' // 로그인 탭으로 초기화
}

</script>

<style lang="scss" scoped>
.dialog {
  width: 600px;
  max-width: 100%;
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>