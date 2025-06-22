<template>
    <Form @submit="onSignUp">
        <q-input v-model="signupIdField" label="ID" type="email" :error="!!signupIdError"
            :error-message="signupIdError" />
        <q-input v-model="signupPwField" type="password" label="password" :error="!!signupPwError"
            :error-message="signupPwError" />
        <q-input v-model="signupPw2Field" type="password" label="confirm password" :error="!!signupPw2Error"
            :error-message="signupPw2Error" />
        <q-input v-model="signupNicknameField" label="Nick Name" :error="!!signupNicknameError"
            :error-message="signupNicknameError" />
        <div class="footer">
            <q-btn label="확인" color="primary" type="submit" />
            <q-btn label="닫기" color="secondary" @click="closeModal" />
        </div>
    </Form>
</template>


<script setup>
import { useQuasar } from 'quasar'
import { Form, useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import useLoginStore from '~/stores/login'

const $q = useQuasar()

const { onClose } = defineProps(['onClose'])


const loginStore = useLoginStore()


const signupSchema = yup.object({
    sid: yup.string().required('아이디를 입력해주세요').email('올바른 이메일 형식이 아닙니다').matches(/^\S*$/, '공백 없이 입력해주세요'),
    spw: yup.string().required('비밀번호를 입력해주세요').min(6, '비밀번호는 최소 6자 이상이어야 합니다').matches(/^\S*$/, '공백 없이 입력해주세요'),
    spw2: yup.string().required('확인용 비밀번호를 입력해주세요').min(6, '비밀번호는 최소 6자 이상이어야 ').oneOf([yup.ref('spw')], '비밀번호가 일치하지 않습니다'),
    sname: yup.string().required('닉네임은 필수입니다').min(2, '닉네임은 최소 2자 이상')
})

const { handleSubmit: handleSignup, resetForm: resetSignupForm } = useForm({
    validationSchema: signupSchema
})

const { value: signupIdField, errorMessage: signupIdError } = useField('sid')
const { value: signupPwField, errorMessage: signupPwError } = useField('spw')
const { value: signupPw2Field, errorMessage: signupPw2Error } = useField('spw2')
const { value: signupNicknameField, errorMessage: signupNicknameError } = useField('sname')

const closeModal = () => {
    resetSignupForm()
    onClose()
}

const { $auth, $db } = useNuxtApp()

const onSignUp = handleSignup(async (values) => {

    try {
        await loginStore.signup({
            auth: $auth,
            db: $db,
            paramsId: values.sid,
            paramsPw: values.spw,
            paramsName: values.sname
        })

        $q.notify({
            type: 'positive',
            message: '회원가입 성공'
        })

        resetSignupForm()
        onClose()
    } catch (error) {
        // 회원가입 실패 처리
        $q.notify({
            type: 'negative',
            message: `회원가입 실패: ${error.message}`
        })
        return
    }
    resetSignupForm()
    onClose()
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