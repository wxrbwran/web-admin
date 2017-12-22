<style lang="less">
    @import '../../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
    <div>
        <Row>
            <Col span="18">
                <Card>
                    <Form :label-width="80">
                        <FormItem label="文章标题" :error="articleError">
                            <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list"/>
                        </FormItem>
                    </Form>
                    <div class="editor margin-top-10">
                        <quill-editor ref="myTextEditor"
                                      v-model="content"
                                      :options="editorOption"
                                      @change="onEditorChange($event)">>
                        </quill-editor>
                    </div>
                </Card>
            </Col>
            <Col span="6" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        发布
                    </p>
                    <p class="margin-top-10">
                        <Icon type="eye"></Icon>&nbsp;&nbsp;公开度：&nbsp;<b>{{ Openness }}</b>
                        <Button v-show="!editOpenness" size="small" @click="handleEditOpenness" type="text">修改</Button>
                        <transition name="openness-con">
                            <div v-show="editOpenness" class="openness-radio-con">
                                <RadioGroup v-model="currentOpenness" vertical>
                                    <Radio label="公开">
                                        公开
                                        <Checkbox v-show="currentOpenness === '公开'" v-model="topArticle">置顶</Checkbox>
                                    </Radio>
                                    <Radio label="私密"></Radio>
                                </RadioGroup>
                                <div>
                                    <Button type="primary" @click="handleSaveOpenness">确认</Button>
                                    <Button type="ghost" @click="cancelEditOpenness">取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
                        <span v-if="publishTimeType === 'immediately'">立即发布</span><span v-else>定时：{{ publishTime }}</span>
                        <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改</Button>
                        <transition name="publish-time">
                            <div v-show="editPublishTime" class="publish-time-picker-con">
                                <div class="margin-top-10">
                                    <DatePicker @on-change="setPublishTime" type="datetime" style="width:200px;" placeholder="选择日期和时间" ></DatePicker>
                                </div>
                                <div class="margin-top-10">
                                    <Button type="primary" @click="handleSavePublishTime">确认</Button>
                                    <Button type="ghost" @click="cancelEditPublishTime">取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <Row class="margin-top-20 publish-button-con">
                        <span class="publish-button"><Button @click="handleSaveDraft">保存草稿</Button></span>
                        <span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { ajaxPost } from '@/libs/ajax';

export default {
    name: 'artical-publish',
    data () {
        return {
            articleTitle: '',
            articleError: '',
            editOpenness: false,
            Openness: '公开',
            currentOpenness: '公开',
            topArticle: false,
            publishTime: '',
            publishTimeType: 'immediately',
            editPublishTime: false, // 是否正在编辑发布时间
            publishLoading: false,
            content: null,
            editorOption: {
                theme: 'snow',
                placeholder: '输入文章内容',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'align': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'font': [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ]
                }
            }
        };
    },
    methods: {
        handleArticletitleBlur () {
            if (this.articleTitle.length !== 0) {
                // this.articleError = '';
                localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
            } else {
                // this.articleError = '文章标题不可为空哦';
                this.$Message.error('文章标题不可为空哦');
            }
        },
        handleEditOpenness () {
            this.editOpenness = !this.editOpenness;
        },
        handleSaveOpenness () {
            this.Openness = this.currentOpenness;
            this.editOpenness = false;
        },
        cancelEditOpenness () {
            this.currentOpenness = this.Openness;
            this.editOpenness = false;
        },
        handleEditPublishTime () {
            this.editPublishTime = !this.editPublishTime;
        },
        handleSavePublishTime () {
            this.publishTimeType = 'timing';
            this.editPublishTime = false;
        },
        cancelEditPublishTime () {
            this.publishTimeType = 'immediately';
            this.editPublishTime = false;
        },
        setPublishTime (datetime) {
            this.publishTime = datetime;
        },
        onEditorChange ({ html, text }) {
            console.log('editor change!', html, text);
            this.content = html;
        },
        canPublish () {
            if (this.articleTitle.length === 0) {
                this.$Message.error('请输入文章标题');
                return false;
            }
            return true;
        },
        handleSaveDraft () {
            if (!this.canPublish()) {
                //
            }
        },
        handlePublish () {
            if (this.canPublish()) {
                this.publishLoading = true;
                const data = {
                    title: this.articleTitle,
                    content: this.content,
                    is_open: this.currentOpenness === '公开',
                    is_top: this.topArticle,
                    publish_time_type: this.publishTimeType,
                    publish_time: !!this.publishTime ? new Date(this.publishTime).getTime() : new Date().getTime(),
                    created_time: new Date().getTime()
                };
                ajaxPost({
                    url: 'article',
                    params: data,
                    success () {
                        this.$Notice.success({
                            title: '保存成功',
                            desc: '新闻《' + this.articleTitle + '》保存成功'
                        });
                    },
                    finally () {
                        this.publishLoading = false;
                    }
                }, this);
            }
        },
    },
    computed: {
        editor () {
            return this.$refs.myTextEditor.quill;
        }
    },
    mounted () {
    },
    destroyed () {
    }
};
</script>
