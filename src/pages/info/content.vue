<template>
  <Form :model="formItem" :rules="ruleValidate" :label-width="80">
      <div class="item">
          <FormItem label="名称">
              <Input v-model="formItem.name" placeholder="翼心科技"></Input>
          </FormItem>
          <FormItem label="简称">
              <Input v-model="formItem.short_name" placeholder="翼心"></Input>
          </FormItem>
      </div>
      <div class="item">
          <FormItem label="版权信息">
              <Input v-model="formItem.copyright" placeholder="© 2019 - 2020 杭州翼心信息科技有限公司"></Input>
          </FormItem>
          <FormItem label="备案信息">
              <Input v-model="formItem.record" placeholder="备案信息(如: 浙ICP备16024029号-1)"></Input>
          </FormItem>
      </div>
      <div class="item">
          <FormItem label="电话">
              <Input v-model="formItem.tel" placeholder="请输入联系电话"></Input>
          </FormItem>
          <FormItem label="email">
              <Input v-model="formItem.email" placeholder="请输入电子邮件"></Input>
          </FormItem>
          <FormItem label="联系地址">
              <Input v-model="formItem.address" placeholder="请输入地址"></Input>
          </FormItem>
      </div>
      <FormItem label="logo">
          <upload-img v-if="!loading" :multiple="false" :action="logoAction" type="logo" :cbList.sync="logoList" />
      </FormItem>
      <FormItem label="轮播图">
          <upload-img v-if="!loading" :multiple="true" :action="loopAction" type="loop" :cbList.sync="loopList" />
      </FormItem>
      <FormItem label="关于我们">
          <quill-editor
            class="editor"
            ref="myTextEditor"
            v-model="formItem.about"
            :options="editorOption"
            @change="onEditorChange($event)">>
          </quill-editor>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSaveSiteInfo">保存</Button>
      </FormItem>
  </Form>
</template>

<script>
  import uploadImg from './upload-img';
  import { ajaxUrl, ajaxGet, ajax } from '@/libs/ajax';
  import { editorOption } from '@/libs/consts';
  
  export default {
      name: 'info-content',
      components: { uploadImg },
      props: {
        site: String,
      },
      data () {
          return {
            formItem: {
                name: '',
                short_name: '',
                copyright: '',
                record: '',
                tel: '',
                address: '',
                email: '',
                about: '',
            },
            ruleValidate: {
              name: [
                  { required: true, message: '请输入名称！', trigger: 'blur' }
              ],
              short_name: [
                  { required: true, message: '请输入简称！', trigger: 'blur' },
              ],
              copyright: [
                  { required: true, message: '请输入版权信息！', trigger: 'blur' }
              ],
              record: [
                  { required: false, message: '请输入备案信息！', trigger: 'blur' }
              ],
              logo: [
                  { required: true, message: '请上传logo图！', trigger: 'blur' }
              ],
            },
            logoList: [],
            loopList: [],
            mode: 'patch',
            loading: true,
            editorOption,
          };
      },
      computed: {
        logoAction() {
          return `${ajaxUrl}/upload/img/logo`
        },
        loopAction() {
          return `${ajaxUrl}/upload/img/loop`
        }
      },
      mounted () {
        this.fetchSiteInfo()
      },
      methods: {
        fetchSiteInfo () {
            this.loading = true;
            ajaxGet({
                url: `info/${this.site}`,
                success (res) {
                    const { info } = res;
                    if (Object.keys(info).length === 0) {
                      this.mode = 'post';
                    } else {
                      Object.keys(this.formItem).forEach(item => {
                        // console.log('item', info[item])
                        this.formItem[item] = info[item]
                      })
                      this.logoList = [{
                        url: info.logo,
                        serveStatic: info.logo,
                        status: 'finished',
                        name: this.handleImgName(info.logo)
                      }];
                      this.loopList = info.img.map(i => ({
                          url: i,
                          serveStatic: i,
                          status: 'finished',
                          name: this.handleImgName(i)
                      }));
                    }
                },
                finally () {
                    this.loading = false;
                }
            }, this);
        },
        handleImgName(imgUrl) {
          return imgUrl.split('/').slice(-1)[0];
        },
        onEditorChange ({ html }) {
            this.formItem.about = html;
        },
        handleSaveSiteInfo() {
          // console.log('myTextEditor', this.$refs.myTextEditor.quill.getText())
          ajax[this.mode](`info/${this.site}`, {
            ...this.formItem,
            about_text: this.$refs.myTextEditor.quill.getText(),
            site: this.site,
            logo: this.logoList.map(list => list.serveStatic)[0],
            img: this.loopList.map(list => list.serveStatic)
          })
          .then(res => {
            this.$Notice.success({
                title: '保存成功',
                desc: '站点信息保存成功'
            });
          })
          .catch(err => {
            this.$Message.error({
                content: err,
            });
          })
        }
      }
  };
</script>

<style scoped lang="less">
  .item{
    display: flex;
    .ivu-form-item{
      flex: 1 1 auto;
    }
  }
</style>
