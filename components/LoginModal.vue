<template>
  <div class="q-pa-md">
    <q-dialog  v-model="loginStore.isLoginModalOpen" persistent>
      <div class="dialog">
      <q-tabs v-model="tab" class="text-teal bg-white" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab name="login" icon="mail" label="로그인" />
        <q-tab name="signUp" icon="alarm" label="회원가입" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="">
        <q-tab-panel name="login">
          <div class="q-pa-md">
            <Form>
              <q-input v-model="loginId" label="ID" />
              <q-input v-model="loginPw" label="password"  />
              <div class="footer">
                <q-btn label="로그인" color="primary" @click="submitLogin" />
                <q-btn label="닫기" color="secondary" @click="closeLoginModal" />              
              </div>              
            </Form>
          </div>
        </q-tab-panel>
        <q-tab-panel name="signUp">
          <div class="q-pa-md">
            <q-input v-model="signupId" label="ID" />
            <q-input v-model="signupPw" label="password" />
            <q-input v-model="signupPw2" label="password 2" />
            <q-input v-model="signupNickname" label="Nick Name" />
            <div class="footer">
              <q-btn label="확인" color="primary" @click="closeLoginModal" />
              <q-btn label="닫기" color="secondary" @click="closeLoginModal" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      </div>

    </q-dialog>
  </div>
</template>

<script setup>
    import { ref } from 'vue'
    import useLoginStore from '~/stores/login'
    import { useQuasar } from 'quasar'
    import { Form, Field, defineRule } from 'vee-validate';

    const $q = useQuasar();
    const loginId = ref('')
    const loginPw = ref('')

    const signupId = ref('')
    const signupPw = ref('')
    const signupPw2 = ref('')
    const signupNickname = ref('')
    const tab = ref('login')

    const loginStore = useLoginStore()


    const loginValidate = () => {
      // 로그인 유효성 검사 로직
      if (!loginId.value || !loginPw.value) {
        $q.notify({
          type: 'negative',
          message: '아이디와 비밀번호를 입력해주세요.'
        })
        return false
      }
      return true
    }

    const closeLoginModal = () => {
      loginStore.closeLoginModal()
    }
    const submitLogin = () => {
      if(loginValidate()) {
        closeLoginModal()
      }else{
        
      }
    }


    // 유효성 검사 함ㅅ
</script>

<style lang="scss" scoped>

.dialog {
  width: 600px ;
  max-width: 100%;
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>