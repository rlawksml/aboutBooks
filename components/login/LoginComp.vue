<template>
    <Form @submit="onSubmitLogin">
        <q-input v-model="loginId" label="ID" type="email" :error="!!idError" :error-message="idError" />
        <q-input v-model="loginPw" label="password" type="password" :error="!!pwError" :error-message="pwError" />
        <div class="footer">
            <q-btn label="로그인" color="primary" type="submit" />
            <q-btn label="닫기" color="secondary" @click="closeModal" />
        </div>
    </Form>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { Form, useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import useLoginStore from '~/stores/login'

const { $auth, $db } = useNuxtApp()
const loginStore = useLoginStore()

const { onClose } = defineProps(['onClose'])

const $q = useQuasar()

// ✅ Yup 스키마 기반 유효성 검사
const loginschema = yup.object({
    id: yup.string().required('아이디를 입력해주세요').email('올바른 이메일 형식이 아닙니다').matches(/^\S*$/, '공백 없이 입력해주세요'),
    pw: yup.string().required('비밀번호를 입력해주세요').min(6, '비밀번호는 최소 6자 이상이어야 합니다').matches(/^\S*$/, '공백 없이 입력해주세요'),
})

const { handleSubmit: handleLoginSubmit, resetForm: resetLoginForm } = useForm({
    validationSchema: loginschema
})

const { value: loginId, errorMessage: idError } = useField('id')
const { value: loginPw, errorMessage: pwError } = useField('pw')

const closeModal = () => {
    resetLoginForm()
    onClose()
}

const onSubmitLogin = handleLoginSubmit(async (values) => {

    try {
        await loginStore.login({ auth: $auth, db: $db, paramsId: values.id, paramsPw: values.pw })

        $q.notify({
            type: 'positive',
            message: '로그인 되었습니다.'
        })
        onClose()
    } catch (error) {
        $q.notify({
            type: 'negative',
            message: `로그인 처리 중 오류가 발생했습니다: ${error.message}`
        })
        return
    }
})
</script>

<style lang="scss" scoped>
.footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>