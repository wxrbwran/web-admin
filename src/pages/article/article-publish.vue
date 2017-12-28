<style lang="less">
    @import './article-publish.less';
    @import "../../styles/common.less";
</style>

<script>
import { ajaxPost } from '@/libs/ajax';
import mixin from './mixin/article';
import template from './mixin/article-template';

export default {
    name: 'article-publish',
    mixins: [mixin],
    methods: {
        handleSaveArticle (option) {
            this.publishLoading = true;
            const data = {
                title: this.articleTitle,
                description: this.description,
                content: this.content,
                news_type: this.currentNewsType,
                cover: this.cover,
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
            ajaxPost(ajaxData, this);
        }
    },
    template,
};
</script>
