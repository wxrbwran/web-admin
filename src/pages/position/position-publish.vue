<style>
    @import "../../styles/common.less";
</style>

<script>
import { ajaxPost } from '@/libs/ajax';
import template from './mixin/position-template';
import mixin from './mixin/position';

export default {
    name: 'position-publish',
    mixins: [mixin],
    methods: {
        handleListValue (list) {
            const filtered = list.filter(l => !!l.status && !!l.value);
            return filtered.map(f => f.value);
        },
        handleSaveArticle (option) {
            this.publishLoading = true;
            const data = {
                position: this.position,
                job_type: this.jobType === '全职' ? 1 : 0,
                experience: this.experience,
                location: this.location,
                site: this.site,
                num: this.num,
                department: this.department,
                temptation: this.handleListValue(this.temptation),
                responsibility: this.handleListValue(this.responsibility),
                skill: this.handleListValue(this.skill),
                professionalism: this.handleListValue(this.professionalism),
                is_open: this.Openness === '公开',
                is_draft: option.is_draft,
                publish_time: new Date(),
                created_time: new Date()
            };
            const ajaxData = {
                url: 'position',
                params: data,
                success () {
                    this.$Notice.success({
                        title: '保存成功',
                        desc: '岗位《' + this.position + '》保存成功'
                    });
                    this.$router.push({
                        name: 'position_list'
                    });
                },
                finally () {
                    this.publishLoading = false;
                }
            };
            ajaxPost(ajaxData, this);
        }
    },
    mounted () {},
    template
};
</script>
