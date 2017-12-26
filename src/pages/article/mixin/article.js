const mixin = {
    data () {
        return {
            articleTitle: '',
            description: '',
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
                localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
            } else {
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
        onEditorChange ({ html }) {
            this.content = html;
        },
        canPublish () {
            if (!this.articleTitle.length || !this.description || !this.content) {
                this.$Message.error('请完善文章再保存!');
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
        }
    }
};

export default mixin;
