<template>
  <Form :rules="ruleValidate" :label-width="80">
    <FormItem label="首页封面">
      <upload-img v-if="!loading" :multiple="false" :action="coverAction" :cbList.sync="coverList" />
    </FormItem>
    <FormItem label="内部封面">
      <upload-img v-if="!loading" :multiple="false" :action="coverAction" :cbList.sync="cover_innerList" />
    </FormItem>
    <FormItem label="简称">
      <Input v-model="desc" placeholder="简述"></Input>
    </FormItem>
    <FormItem label="文案">
      <quill-editor
        class="editor"
        ref="myTextEditor"
        v-model="text"
        :options="editorOption"
        @change="onEditorChange($event)">>
      </quill-editor>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSaveDiseaseInfo">保存</Button>
    </FormItem>
  </Form>
</template>

<script>
  import uploadImg from '../info/upload-img';
  import { ajaxUrl, ajaxGet, ajax } from '@/libs/ajax';
  import { editorOption } from '@/libs/consts';

  export default {
    name: 'slow-disease',
    components: { uploadImg },
    props: {
      type: String
    },
    data () {
      return {
        desc: '',
        text: '',
        ruleValidate: {},
        coverList: [],
        cover_innerList: [],
        mode: 'patch',
        loading: true,
        editorOption
      };
    },
    computed: {
      coverAction () {
        return `${ajaxUrl}/upload/img/cover`;
      }
    },
    mounted () {
      this.fetchSlowInfo();
    },
    methods: {
      fetchSlowInfo () {
        this.loading = true;
        ajaxGet({
          url: `slow/${this.type}`,
          success (res) {
            const { info } = res;
            if (Object.keys(info).length === 0) {
              this.mode = 'post';
            } else {
              this.text = info.text;
              this.desc = info.desc;
              if (info.cover) {
                this.coverList = [{
                  url: info.cover,
                  serveStatic: info.cover,
                  status: 'finished',
                  name: this.handleImgName(info.cover)
                }];
              }
              if (info.cover_inner) {
                this.cover_innerList = [{
                  url: info.cover_inner,
                  serveStatic: info.cover_inner,
                  status: 'finished',
                  name: this.handleImgName(info.cover_inner)
                }];
              }
            }
          },
          finally () {
            this.loading = false;
          }
        }, this);
      },
      handleImgName (imgUrl) {
        if (imgUrl) {
          return imgUrl.split('/').slice(-1)[0];
        }
        return null;
      },
      onEditorChange (content) {
        console.log('content', content);
        this.text = content.html;
      },
      handleSaveDiseaseInfo () {
        // console.log('myTextEditor', this.$refs.myTextEditor.quill.getText())
        ajax[this.mode](`slow/${this.type}`, {
          text: this.text,
          type: this.type,
          desc: this.desc,
          cover: this.coverList.map(list => list.serveStatic)[0],
          cover_inner: this.cover_innerList.map(list => list.serveStatic)[0]
        })
          .then(res => {
            this.mode = 'patch';
            this.$Notice.success({
              title: '保存成功',
              desc: '信息保存成功'
            });
          })
          .catch(err => {
            this.$Message.error({
              content: err
            });
          });
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
