<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <Table border :loading="loading" :columns="columns" :data="data"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current="1" :page-size="5" @on-change="handleChangeList"></Page>
                    </div>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import { ajaxGet } from '@/libs/ajax';
import momoent from 'moment';

export default {
    name: 'editable-table',
    data () {
        return {
            total: 0,
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
                    title: '是否发布',
                    key: 'is_open',
                    render: (h, params) => {
                        return h('span',
                            !!params.row.is_open ? '已发布' : '');
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
                    render: (h, params) => {
                        return h('span',
                            momoent(params.row.publish_time, 'x')
                                .format('YYYY/MM/DD HH:mm:ss'));
                    }
                },
                {
                    title: '创建时间',
                    key: 'created_time',
                    render: (h, params) => {
                        return h('span',
                            momoent(params.row.created_time, 'x')
                                .format('YYYY/MM/DD'));
                    }
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
                                        this.show(params.index);
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index);
                                    }
                                }
                            }, '删除')
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
                url: 'article',
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
        handleChangeList (pageAt) {
            this.fetchArticleList({
                page_at: pageAt
            });
        }
    }
};
</script>
