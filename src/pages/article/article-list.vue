<template>
    <div>
        <Row>
            <Card>
                <Table border :loading="loading" :columns="columns" :data="data"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current.sync="current" :page-size="5" @on-change="handleChangeList"></Page>
                    </div>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import { ajaxGet, ajaxDelete } from '@/libs/ajax';
import momoent from 'moment';

export default {
    name: 'article-list',
    data () {
        return {
            total: 0,
            current: 1,
            loading: false,
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    render: (h, params) => {
                        return h('div', [
                            h('strong', params.row.index)
                        ]);
                    }
                },
                {
                    title: '新闻标题',
                    key: 'title'
                },
                {
                    title: '新闻类型',
                    key: 'news_type',
                    render: (h, params) => {
                        return h('span',
                            params.row.news_type === 'latest' ? '最新动态'
                                : params.row.news_type === 'media' ? '媒体报道' : '业内文化');
                    }
                },
                {
                    title: '是否公开',
                    key: 'is_open',
                    render: (h, params) => {
                        return h('span',
                            !!params.row.is_open ? '公开' : '私密');
                    }
                },
                {
                    title: '是否置顶',
                    key: 'is_top',
                    render: (h, params) => {
                        return h('span',
                            !!params.row.is_top ? '置顶' : '');
                    }
                },
                {
                    title: '是否草稿',
                    key: 'is_draft',
                    render: (h, params) => {
                        return h('span',
                            !!params.row.is_draft ? '是' : '');
                    }
                },
                {
                    title: '发布方式',
                    key: 'publish_time_type',
                    render: (h, params) => {
                        return h('span',
                            params.row.publish_time_type === 'immediately' ?
                                '立即发布' : '定时发布');
                    }
                },
                {
                    title: '发布时间',
                    key: 'publish_time',
                },
                {
                    title: '创建时间',
                    key: 'created_time',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'article_edit',
                                            params: {
                                                id: params.row.id
                                            }
                                        });
                                    }
                                }
                            }, '编辑'),
                            h('Poptip', {
                                props: {
                                    confirm: true,
                                    title: '您确定要删除这条数据吗?',
                                    transfer: true
                                },
                                on: {
                                    'on-ok': () => {
                                        this.deleteArticleById(params.row.id);
                                    }
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    }
                                }, '删除')
                            ])
                        ]);
                    }
                }
            ],
            data: []
        };
    },
    mounted () {
        this.fetchArticleList({});
    },
    methods: {
        fetchArticleList (params) {
            const data = Object.assign({}, {
                page_at: 1,
                page_size: 5
            }, params);
            this.loading = true;
            ajaxGet({
                url: 'all_articles',
                params: data,
                success (res) {
                    this.data = res.news;
                    this.total = res.total;
                },
                finally () {
                    this.loading = false;
                }
            }, this);
        },
        deleteArticleById (id) {
            ajaxDelete({
                url: `article/${id}`,
                success () {
                    this.$Message.success({
                        content: '删除成功'
                    });
                    this.current = 1;
                    this.fetchArticleList({
                        page_at: 1
                    });
                }
            }, this);
        },
        handleChangeList (pageAt) {
            this.fetchArticleList({
                page_at: pageAt
            });
        }
    }
};
</script>
