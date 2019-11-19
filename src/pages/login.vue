<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import { authPost, setAjaxHeader } from '../libs/ajax';
import Cookies from 'js-cookie';

export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            const self  = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    authPost({
                        url: 'auth/login',
                        params: {
                            username: this.form.userName,
                            password: this.form.password
                        },
                        success (res) {
                            const { status, data } = res.data;
                            if (status === 'success') {
                                Cookies.set('user', self.form.userName);
                                Cookies.set('access', 0);
                                setAjaxHeader(data.token);
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('refresh', data.refresh_token);
                                this.$router.push({
                                    name: 'home_index'
                                });
                            } else {
                                self.$Message.error({
                                    content: data
                                });
                            }
                        }
                    }, this);
                }
            });
        }
    }
};
</script>

<style>

</style>
