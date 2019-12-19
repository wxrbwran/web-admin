const mixin = {
    data () {
        return {
            position: '',
            jobType: '全职',
            location: '北京',
            num: '',
            department: '',
            experience: '无',
            temptationIndex: 1,
            temptation: [], // 职位诱惑
            responsibilityIndex: 1,
            responsibility: [], // 岗位职责
            skillIndex: 1,
            skill: [], // 技能经验
            professionalismIndex: 1,
            professionalism: [], // 职业素养
            editOpenness: false,
            Openness: '公开',
            currentOpenness: '公开',
            publishLoading: false,
            site: ''
        };
    },
    methods: {
        handlePositionBlur () {
            if (this.position.length !== 0) {
                localStorage.position = this.position; // 本地存储文章标题
            } else {
                this.$Message.error('职位名称不可为空');
            }
        },
        handleAddTemptation () {
            this.temptationIndex++;
            this.temptation.push({
                value: '',
                index: this.temptationIndex,
                status: 1
            });
        },
        handleRemoveTemptation (index) {
            this.temptation[index].status = 0;
        },
        handleAddResponsibility () {
            this.responsibilityIndex++;
            this.responsibility.push({
                value: '',
                index: this.responsibilityIndex,
                status: 1
            });
        },
        handleRemoveResponsibility (index) {
            this.responsibility[index].status = 0;
        },
        handleAddSkillExperience () {
            this.skillIndex++;
            this.skill.push({
                value: '',
                index: this.skillIndex,
                status: 1
            });
        },
        handleRemoveExperience (index) {
            this.skill[index].status = 0;
        },
        handleAddProfessionalism () {
            this.professionalismIndex++;
            this.professionalism.push({
                value: '',
                index: this.professionalismIndex,
                status: 1
            });
        },
        handleRemoveProfessionalism (index) {
            this.professionalism[index].status = 0;
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
        canPublish () {
            if (this.position.length === 0) {
                this.$Message.error('请输入岗位名称!');
                return false;
            }
            if (!this.department) {
                this.$Message.error('请选择所属部门!');
                return false;
            }
            if (!this.site) {
                this.$Message.error('请选择发布网站!');
                return false;
            }
            return true;
        },
        handleSaveDraft () {
            if (this.canPublish()) {
                this.handleSaveArticle({
                    is_draft: true
                });
            }
        },
        handlePublish () {
            if (this.canPublish()) {
                this.handleSaveArticle({
                    is_draft: false
                });
            }
        },
        handleListValue (list) {
            const filtered = list.filter(l => !!l.status && !!l.value);
            return filtered.map(f => f.value);
        }
    }
};

export default mixin;
