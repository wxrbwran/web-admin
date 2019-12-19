<template>
    <div>
      <div :class="['demo-upload-list', type]" v-for="item in uploadList" :key="item.serveStatic">
          <template v-if="item.status === 'finished'">
              <img :src="item.serveStatic">
              <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
          </template>
          <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
      </div>
      <Upload
          ref="upload"
          v-show="showUpload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png', 'svg']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :multiple="multiple"
          type="drag"
          :action="action"
          style="display: inline-block;">
          <div :class="type">
              <Icon type="camera" size="20"></Icon>
          </div>
      </Upload>
      <Modal title="查看图片" v-model="visible">
          <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>
    </div>
</template>
<script>
    import { ajaxUrl } from '@/libs/ajax';
    export default {
        props: {
          action: String,
          type: String,
          multiple: Boolean,
          cbList: Array
        },
        data () {
            return {
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: []
            }
        },
        computed: {
          showUpload() {
            if (this.type !== 'logo') {
              return true;
            } else {
              return this.uploadList.length === 0;
            }
          }
        },
        methods: {
            handleView (item) {
                this.imgName = item.serveStatic;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                console.log('handleSuccess', res, file, this.uploadList)
                const current = this.uploadList.filter(list => list.name === file.name)[0];
                current.serveStatic = `${ajaxUrl}/${res.data.url}`
                console.log('handleSuccess current', current)
                this.$emit('update:cbList', this.uploadList)
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件类型错误',
                    desc: file.name + ' 文件类型不对，请选择正确的图片！'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '图片大小超限',
                    desc: '文件  ' + file.name + ' 太大，应小于2M.'
                });
            },
            handleBeforeUpload () {
                return true;
            }
        },
        created() {},
        watch: {
          // cbList(newVal, oldval) {
          //   console.log(newVal, oldval);
          //   if (newVal.length !== oldval.length && oldval.length === 0) {
          //     this.uploadList = this.cbList;
          //   } else {
          //     this.cbList = newVal;
          //   }
          // }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList = this.cbList;
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .logo {
      width: 58px;
      height:58px;
      line-height: 58px;
    }
    .loop {
      width: 198px;
      height:198px;
      line-height: 198px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
