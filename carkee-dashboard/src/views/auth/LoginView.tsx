import { FC, useEffect, CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Row, Col, Button, Form, Input, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

// Assets
// import { GoogleSVG, FacebookSVG } from '@/assets/svg/icon';

// Redux Actions
import {
  signInManual,
  showLoading,
  hideAuthMessage,
  // signInWithGoogle,
  // signInWithFacebook,
} from '@/redux/actions/auth';

// Components
// import { CustomIcon } from '@/components/util';

// Custom Hooks
import { useTheme, useAuth } from '@/hooks';

const backgroundStyle: CSSProperties = {
  backgroundImage: 'url(/img/others/img-17.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const LoginView: FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const auth = useAuth();

  const handleLogin = (user: object) => {
    dispatch(showLoading());
    dispatch(signInManual(user));
  };

  // const onGoogleLogin = () => {
  //   showLoading();
  //   signInWithGoogle();
  // };

  // const onFacebookLogin = () => {
  //   showLoading();
  //   signInWithFacebook();
  // };

  useEffect(() => {
    if (auth.token !== null) {
      history.push('/');
    }

    setTimeout(() => {
      dispatch(hideAuthMessage());
    }, 3000);
  }, [auth.token, dispatch, history]);

  return (
    <div className='h-100' style={backgroundStyle}>
      <div className='container d-flex flex-column justify-content-center h-100'>
        <Row justify='center'>
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className='my-4'>
                <div className='text-center'>
                  <img
                    className='img-fluid'
                    src={`/img/${
                      theme.currentTheme === 'light'
                        ? 'logo.png'
                        : 'logo-white.png'
                    }`}
                    alt=''
                  />
                  {/* <p>
                    Don't have an account yet?{' '}
                    <a href='/auth/register-1'>Sign Up</a>
                  </p> */}
                </div>
                <Row justify='center'>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <motion.div
                      initial={{ opacity: 0, marginBottom: 0 }}
                      animate={{
                        opacity: auth.showMessage ? 1 : 0,
                        marginBottom: auth.showMessage ? 20 : 0,
                      }}
                    >
                      <Alert
                        type='error'
                        showIcon
                        message={auth.message}
                      ></Alert>
                    </motion.div>
                    <Form
                      layout='vertical'
                      name='login-form'
                      onFinish={handleLogin}
                    >
                      <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email',
                          },
                          {
                            type: 'email',
                            message: 'Please enter a validate email!',
                          },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined className='text-primary' />}
                        />
                      </Form.Item>
                      <Form.Item
                        name='password'
                        label={
                          <div
                            className={`d-flex justify-content-between w-100 align-items-center`}
                          >
                            <span>Password</span>
                            {/* <span className='cursor-pointer font-size-sm font-weight-normal text-muted'>
                              Forget Password?
                            </span> */}
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password',
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined className='text-primary' />}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type='primary'
                          htmlType='submit'
                          block
                          loading={auth.loading}
                        >
                          Sign In
                        </Button>
                      </Form.Item>

                      {/* <div>
                        <Divider>
                          <span className='text-muted font-size-base font-weight-normal'>
                            or connect with
                          </span>
                        </Divider>
                        <div className='d-flex justify-content-center'>
                          <Button
                            onClick={() => onGoogleLogin()}
                            className='mr-2'
                            disabled={auth.loading}
                            icon={<CustomIcon svg={GoogleSVG} />}
                          >
                            Google
                          </Button>
                          <Button
                            onClick={() => onFacebookLogin()}
                            icon={<CustomIcon svg={FacebookSVG} />}
                            disabled={auth.loading}
                          >
                            Facebook
                          </Button>
                        </div>
                      </div> */}
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginView;
