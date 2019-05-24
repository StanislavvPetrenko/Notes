import React from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd/lib/index';
import { authenticate, selectAuthLoading } from '../store/authentication';
import FormItem from 'antd/es/form/FormItem';

class NormalLoginForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.login(values.email, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
      <React.Fragment>
        { loading ? <p>Loading....</p>
        :
        <Form onSubmit={this.handleSubmit} className="login-form note-container">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <span className="login-page-text">Or</span>
            <Link to="/registration">Register now!</Link>
          </FormItem>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
          </Form.Item>
        </Form>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: selectAuthLoading(state),
});

const mapDispatchToProps = {
  login: authenticate
};

const login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(login);
