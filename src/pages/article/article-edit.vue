<style lang="less">
    @import './article-publish.less';
    @import "../../styles/common.less";
</style>

<script>
    import moment from 'moment';
    import { ajaxPost, ajaxGet, ajaxPatch } from '@/libs/ajax';
    import mixin from './mixin/article';
    import template from './mixin/article-template';

    export default {
        name: 'article-edit',
        mixins: [mixin],
        methods: {
            handleSaveArticle (option) {
                this.publishLoading = true;
                const data = {
                    title: this.articleTitle,
                    description: this.description,
                    content: this.content,
                    is_open: this.currentOpenness === '公开',
                    is_top: this.topArticle,
                    publish_time_type: this.publishTimeType,
                    publish_time: !!this.publishTime ?
                        new Date(this.publishTime) : new Date(),
                    created_time: new Date()
                };
                data.is_draft = option.is_draft;
                const ajaxData = {
                    url: 'article',
                    params: data,
                    success () {
                        this.$Notice.success({
                            title: '保存成功',
                            desc: '新闻《' + this.articleTitle + '》保存成功'
                        });
                        this.$router.push({
                            name: 'article_list'
                        });
                    },
                    finally () {
                        this.publishLoading = false;
                    }
                };
                const { params } = this.$route;
                delete data.created_time;
                ajaxData.url = `article/${params.id}`;
                ajaxPatch(ajaxData, this);
            },
            fetchArticle (id) {
                ajaxGet({
                    url: `article/${id}`,
                    success (res) {
                        if (JSON.stringify(res) !== '{}') {
                            const { news } = res;
                            this.articleTitle = news.title;
                            this.description = news.description;
                            this.content = news.content;
                            this.currentOpenness = news.is_open ? '公开' : '私密';
                            this.Openness = news.is_open ? '公开' : '私密';
                            this.topArticle = news.is_top;
                            this.publishTimeType = news.publish_time_type;
                            this.publishTime = moment(+news.publish_time, 'x').format('YYYY-MM-DD HH:mm:ss');
                        } else {
                            this.$Message.error({
                                content: '新闻不存在!'
                            });
                            this.$router.push({
                                name: 'article_list'
                            });
                        }
                    }
                }, this);
            }
        },
        mounted () {
            const { params } = this.$route;
            this.fetchArticle(params.id);
        },
        template,
    };
</script>
