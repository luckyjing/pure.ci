import React, {Component} from 'react';
import {connect} from 'dva';
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  message
} from 'antd';
import {hasErrors} from '../../../utils/base';
import TimeLine from './detail/timeline';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    sm: {
      span: 8
    }
  }
};
class Container extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'layout/pageName', payload: '创建项目'})
    dispatch({type: 'project/fetchRepository'})
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          const projectInfo = {
            name: values.projectName,
            repository_name: values
              .repository
              .split('&&')[0],
            repository_url: values
              .repository
              .split('&&')[1]
          }
          this
            .props
            .dispatch({type: 'project/create', payload: projectInfo})
        }
      })
  }
  render() {
    const {getFieldDecorator, getFieldsError} = this.props.form;
    const {project} = this.props;
    return (
      <div className="material-card">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="项目名称">
            {getFieldDecorator('projectName', {
              rules: [
                {
                  required: true,
                  message: '请输入项目名称!'
                }
              ]
            })(<Input placeholder="给项目起一个名字..."/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="设置代码源"
            extra="代码源指定了您项目的代码仓库位置，关联代码源后，您对代码源的操作会自动触发项目的相应动作比如持续集成和镜像构建。">
            {getFieldDecorator('repository', {
              rules: [
                {
                  required: true,
                  message: '请选择代码源!'
                }
              ]
            })(
              <Select
                showSearch
                placeholder="请选择（支持搜索）"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {project
                  .repositories
                  .map((item, index) => {
                    return <Option key={index} value={item.repository_name + '&&' + item.repository_url}>{item.repository_name}</Option>;
                  })}

                <Option value="tom">Tom</Option>
              </Select>
            )}
          </FormItem>
          <FormItem wrapperCol={{
            span: 4,
            offset: 4
          }}>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>开始创建</Button>
          </FormItem>
        </Form>
      </div>

    );
  }
}

function mapStatetoProps(state) {
  return {project: state.project}
}

export default Form.create()(connect(mapStatetoProps)(Container));