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
import { siteList } from '@/libs/consts';

export default {
    name: 'position-list',
    data () {
        return {
            total: 0,
            current: 1,
            loading: false,
            siteList,
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
                    title: '发布网站',
                    key: 'site',
                    render: (h, params) => {
                        return h('span', siteList[params.row.site]);
                    }
                },
                {
                    title: '职位',
                    key: 'position'
                },
                {
                    title: '职位类型',
                    key: 'job_type',
                    render: (h, params) => {
                        return h('span',
                            !!params.row.job_type ? '全职' : '兼职');
                    }
                },
                {
                    title: '所属部门',
                    key: 'department'
                },
                {
                    title: '工作经验',
                    key: 'experience'
                },
                {
                    title: '工作地点',
                    key: 'location'
                },
                {
                    title: '人数',
                    key: 'num'
                },
                {
                    title: '是否公开',
                    key: 'is_open',
                    render: (h, params) => {
                        return h('span', params.row.is_open ? '公开' : '私密');
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
                    title: '创建时间',
                    key: 'created_time'
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
                                            name: 'position_edit',
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
                                        this.deletePositionById(params.row.id);
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
        this.fetchPositionList({});
    },
    methods: {
        fetchPositionList (params) {
            const data = Object.assign({}, {
                page_at: 1,
                page_size: 5
            }, params);
            this.loading = true;
            ajaxGet({
                url: 'all_positions',
                params: data,
                success (res) {
                    this.data = res.positions;
                    this.total = res.total;
                },
                finally () {
                    this.loading = false;
                }
            }, this);
        },
        deletePositionById (id) {
            ajaxDelete({
                url: `position/${id}`,
                success () {
                    this.$Message.success({
                        content: '删除成功'
                    });
                    this.current = 1;
                    this.fetchPositionList({
                        page_at: 1
                    });
                }
            }, this);
        },
        handleChangeList (pageAt) {
            this.fetchPositionList({
                page_at: pageAt
            });
        }
    }
};
</script>
