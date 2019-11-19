export default `
    <Row>
        <Col span="18">
            <Card>
                <Form :label-width="80">
                    <FormItem label="新闻标题">
                        <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list"/>
                    </FormItem>
                    <FormItem label="简介">
                        <Input v-model="description"/>
                    </FormItem>
                    <FormItem label="封面图">
                        <Card class="news-cover">
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-exceeded-size="handleMaxSize"
                                :on-format-error="handleFormatError"
                                :on-success="handleSuccess"
                                type="drag"
                                :action="action"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <template v-if="cover">
                                <img :src="cover_url">
                            </template>
                        </Card>
                    </FormItem>
                </Form>
                <div class="editor margin-top-10">
                    <quill-editor ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                          @change="onEditorChange($event)">>
                    </quill-editor>
                </div>
            </Card>
        </Col>
        <Col span="6" class="padding-left-10">
            <Card>
                <p slot="title">
                    <Icon type="paper-airplane"></Icon>
                    新闻类型
                </p>
                <Select v-model="currentNewsType">
                    <Option v-for="item in newsType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Card>
            <Card class="margin-top-10">
                <p slot="title">
                    <Icon type="paper-airplane"></Icon>
                    发布
                </p>
                <p class="margin-top-10">
                    <Icon type="eye"></Icon>&nbsp;&nbsp;公开度：&nbsp;<b>{{ Openness }}</b>
                    <Button v-show="!editOpenness" size="small" @click="handleEditOpenness" type="text">修改</Button>
                    <transition name="openness-con">
                        <div v-show="editOpenness" class="openness-radio-con">
                            <RadioGroup v-model="currentOpenness" vertical>
                                <Radio label="公开">
                                    公开
                                    <Checkbox v-show="currentOpenness === '公开'" v-model="topArticle">置顶</Checkbox>
                                </Radio>
                                <Radio label="私密"></Radio>
                            </RadioGroup>
                            <div>
                                <Button type="primary" @click="handleSaveOpenness">确认</Button>
                                <Button type="ghost" @click="cancelEditOpenness">取消</Button>
                            </div>
                        </div>
                    </transition>
                </p>
                <p class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
                    <span v-if="publishTimeType === 'immediately'">立即发布</span>
                    <span v-else>定时：{{ publishTime }}</span>
                    <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改</Button>
                    <transition name="publish-time">
                        <div v-show="editPublishTime" class="publish-time-picker-con">
                            <div class="margin-top-10">
                                <DatePicker :value="publishTime" @on-change="setPublishTime" type="datetime" style="width:200px;" placeholder="选择日期和时间" ></DatePicker>
                            </div>
                            <div class="margin-top-10">
                                <Button type="primary" @click="handleSavePublishTime">确认</Button>
                                <Button type="ghost" @click="cancelEditPublishTime">取消</Button>
                            </div>
                        </div>
                    </transition>
                </p>
                <p class="margin-top-10">
                    <Icon type="network"></Icon>&nbsp;&nbsp;
                    <span>发布网站</span>
                    <RadioGroup v-model="site">
                        <Radio label="yixin">翼心</Radio>
                        <Radio label="zexin">泽心</Radio>
                    </RadioGroup>
                </p>
                <Row class="margin-top-20 publish-button-con">
                    <span class="publish-button">
                        <Button @click="handleSaveDraft" :loading="publishLoading">保存草稿</Button>
                    </span>
                    <span class="publish-button">
                        <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button>
                    </span>
                </Row>
            </Card>
        </Col>
    </Row>
`;
