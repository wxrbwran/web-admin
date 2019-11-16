<template>
  <Form :model="formItem" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称">
              <Input v-model="formItem.name" placeholder="翼心科技"></Input>
          </FormItem>
          <FormItem label="简称">
              <Input v-model="formItem.short_name" placeholder="翼心"></Input>
          </FormItem>
          <FormItem label="版权信息">
              <Input v-model="formItem.copyright" placeholder="© 2019 - 2020 杭州翼心信息科技有限公司"></Input>
          </FormItem>
          <FormItem label="备案信息">
              <Input v-model="formItem.record" placeholder="备案信息(如: 浙ICP备16024029号-1)"></Input>
          </FormItem>
          <FormItem label="logo">
              <upload-img v-if="!loading" :multiple="false" :action="logoAction" type="logo" :cbList.sync="logoList" />
          </FormItem>
          <FormItem label="轮播图">
              <upload-img v-if="!loading" :multiple="true" :action="loopAction" type="loop" :cbList.sync="loopList" />
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSaveSiteInfo">保存</Button>
          </FormItem>
      </Form>
</template>

<script>
  import uploadImg from './upload-img';
  import { ajaxUrl, ajaxGet, ajax } from '@/libs/ajax';
  
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
                    // console.log('fetchSiteInfo', res)
                    // console.log('Object.keys(this.formItem)', Object.keys(this.formItem))
                    const { info } = res;
                    if (Object.keys(info).length === 0) {
                      this.mode = 'post';
                    } else {
                      Object.keys(this.formItem).forEach(item => {
                        console.log('item', info[item])
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
        handleSaveSiteInfo() {
          ajax[this.mode](`info/${this.site}`, {
            ...this.formItem,
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
          // console.log('formItem', this.formItem);
          // console.log('site', this.site);
          // console.log('logoList', this.logoList);
          // console.log('loopList', this.loopList);
        }
      }
  };
</script>

<style>
</style>
