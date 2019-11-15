import { ajaxUrl } from '../../../libs/ajax';

const mixin = {
    data () {
        return {
            articleTitle: '',
            description: '',
            content: null,
            cover: '',
            cover_url: null,
            newsType: [
                {
                    value: 'latest',
                    label: '最新动态'
                },
                {
                    value: 'media',
                    label: '媒体报道'
                },
                {
                    value: 'culture',
                    label: '业内文化'
                }
            ],
            currentNewsType: 'latest',
            editOpenness: false,
            Openness: '公开',
            currentOpenness: '公开',
            topArticle: false,
            publishTime: '',
            publishTimeType: 'immediately',
            editPublishTime: false, // 是否正在编辑发布时间
            publishLoading: false,
            site: '',
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
    computed: {
        action () {
            return `${ajaxUrl}/upload/img/`;
        }
    },
    methods: {
        handleArticletitleBlur () {
            if (this.articleTitle.length !== 0) {
                localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
            } else {
                this.$Message.error('文章标题不可为空哦');
            }
        },
        handleSuccess (res) {
            const { url } = res.data;
            this.cover = url;
            this.cover_url = `${ajaxUrl}/${url}`;
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '错误的文件格式!',
                desc: '请上传png、jpg、jpeg格式的文件'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '文件过大！',
                desc: '文件大小请限制在2M大小内'
            });
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
            if (!this.articleTitle.length || !this.description ||
                !this.content || !this.cover || !this.site) {
                this.$Message.error('请完善文章所需内容再保存!');
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
