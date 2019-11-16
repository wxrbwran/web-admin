<style>
    @import "../../styles/common.less";
</style>

<script>
    import { ajaxGet, ajaxPatch } from '@/libs/ajax';
    import template from './mixin/position-template';
    import mixin from './mixin/position';

    export default {
        name: 'position-edit',
        mixins: [mixin],
        methods: {
            handleSaveArticle (option) {
                this.publishLoading = true;
                const data = {
                    position: this.position,
                    job_type: this.jobType === '全职' ? 1 : 0,
                    experience: this.experience,
                    location: this.location,
                    site: this.site,
                    temptation: this.handleListValue(this.temptation),
                    responsibility: this.handleListValue(this.responsibility),
                    skill: this.handleListValue(this.skill),
                    professionalism: this.handleListValue(this.professionalism),
                    is_open: this.Openness === '公开',
                    is_draft: option.is_draft,
                    publish_time: new Date(),
                };
                const { params } = this.$route;
                const ajaxData = {
                    url: `position/${params.id}`,
                    params: data,
                    success () {
                        this.$Notice.success({
                            title: '保存成功',
                            desc: '岗位《' + this.position + '》编辑成功'
                        });
                        this.$router.push({
                            name: 'position_list'
                        });
                    },
                    finally () {
                        this.publishLoading = false;
                    }
                };
                ajaxPatch(ajaxData, this);
            },
            fillPositionList (list) {
                ['temptation', 'responsibility', 'skill', 'professionalism']
                    .forEach(item => {
                        list[item].length > 0 && list[item].forEach(t => {
                            this[`${item}Index`]++;
                            this[item].push({
                                value: t,
                                index: this[`${item}Index`],
                                status: 1
                            });
                        });
                    });
            },
            fetchPosition (id) {
                ajaxGet({
                    url: `position/${id}`,
                    success (res) {
                        if (JSON.stringify(res) !== '{}') {
                            const { position } = res;
                            this.position = position.position;
                            this.jobType = position.job_type === 1 ? '全职' : '兼职';
                            this.experience = position.experience;
                            this.location = position.location;
                            this.fillPositionList(position);
                            this.currentOpenness = position.is_open ? '公开' : '私密';
                            this.Openness = position.is_open ? '公开' : '私密';
                            this.publishTime = new Date();
                            this.site = position.site;
                        } else {
                            this.$Message.error({
                                content: '职位信息不存在!'
                            });
                            this.$router.push({
                                name: 'position_list'
                            });
                        }
                    }
                }, this);
            }
        },
        mounted () {
            const { params } = this.$route;
            this.fetchPosition(params.id);
        },
        template
    };
</script>
