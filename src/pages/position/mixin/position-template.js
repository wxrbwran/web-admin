export default `
<Row>
        <Col span="18">
            <Card>
                <Form :label-width="80">
                    <FormItem label="职位名称">
                        <Input v-model="position" @on-blur="handlePositionBlur"/>
                    </FormItem>
                    <FormItem label="职位类型">
                        <RadioGroup v-model="jobType">
                            <Radio label="全职">全职</Radio>
                            <Radio label="兼职">兼职</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="工作经验">
                        <Select v-model="experience" placeholder="工作经验">
                            <Option value="无">无</Option>
                            <Option value="应届毕业生">应届生</Option>
                            <Option value="1-3年">1-3年</Option>
                            <Option value="3-5年">3-5年</Option>
                            <Option value="5年以上">5年以上</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="工作地点">
                        <Select v-model="location" placeholder="工作地点">
                            <Option value="北京">北京</Option>
                            <Option value="杭州">杭州</Option>
                            <Option value="上海">上海</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="职位诱惑"
                    >
                        <Row
                            class="margin-bottom-10"
                            v-for="(item, index) in temptation"
                            v-if="item.status"
                            :key="index"
                        >
                            <Col span="18">
                                <Input type="textarea" autosize v-model="item.value" />
                            </Col>
                            <Col span="4" offset="2">
                                <Button type="ghost" @click="handleRemoveTemptation(index)">删除</Button>
                            </Col>
                        </Row>
                        <Button type="dashed" @click="handleAddTemptation" icon="plus-round">添加</Button>
                    </FormItem>
                    <FormItem
                        label="岗位职责"
                    >
                        <Row
                            class="margin-bottom-10"
                            v-for="(item, index) in responsibility"
                            v-if="item.status"
                            :key="index"
                        >
                            <Col span="18">
                            <Input type="textarea" autosize v-model="item.value" />
                            </Col>
                            <Col span="4" offset="2">
                            <Button type="ghost" @click="handleRemoveResponsibility(index)">删除</Button>
                            </Col>
                        </Row>
                        <Button type="dashed" @click="handleAddResponsibility" icon="plus-round">添加</Button>
                    </FormItem>
                    <FormItem
                        label="技能经验"
                    >
                        <Row
                            class="margin-bottom-10"
                            v-for="(item, index) in skill"
                            v-if="item.status"
                            :key="index"
                        >
                            <Col span="18">
                            <Input type="textarea" autosize v-model="item.value" />
                            </Col>
                            <Col span="4" offset="2">
                            <Button type="ghost" @click="handleRemoveExperience(index)">删除</Button>
                            </Col>
                        </Row>
                        <Button type="dashed" @click="handleAddSkillExperience" icon="plus-round">添加</Button>
                    </FormItem>
                    <FormItem
                        label="职业素养"
                    >
                        <Row
                            class="margin-bottom-10"
                            v-for="(item, index) in professionalism"
                            v-if="item.status"
                            :key="index"
                        >
                            <Col span="18">
                            <Input type="textarea" autosize v-model="item.value" />
                            </Col>
                            <Col span="4" offset="2">
                            <Button type="ghost" @click="handleRemoveProfessionalism(index)">删除</Button>
                            </Col>
                        </Row>
                        <Button type="dashed" @click="handleAddProfessionalism" icon="plus-round">添加</Button>
                    </FormItem>
                </Form>
            </Card>
        </Col>
        <Col span="6" class="padding-left-10">
            <Card>
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
                                <Radio label="公开">公开</Radio>
                                <Radio label="私密"></Radio>
                            </RadioGroup>
                            <div>
                                <Button type="primary" @click="handleSaveOpenness">确认</Button>
                                <Button type="ghost" @click="cancelEditOpenness">取消</Button>
                            </div>
                        </div>
                    </transition>
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
