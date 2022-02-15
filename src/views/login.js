import BaseView from '@views/base';
import { ReactComponent as SnsDivider } from '@asset/sns_divider.svg';
import { ReactComponent as Facebook } from '@asset/facebook.svg';
import { ReactComponent as Twitter } from '@asset/twitter.svg';
import styles from './login.module.css';
import { useRef } from 'react';
import { ApiMap } from '../api';

function LoginView() {
  const idRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async e => {
    e.preventDefault();
    const id = idRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await ApiMap.login({
        username: `${id}`,
        password: `${password}`,
      });
      window.localStorage.setItem('token', response.data.access);
      window.localStorage.setItem('refresh', response.data.refresh);
      window.localStorage.setItem('username', id);
    } catch (error) {}
  };

  return (
    <BaseView type={'page'}>
      <div id="login">
        {/* TODO. 1 로그인 페이지 디자인 및 로그인 기능 구현 */}
        <div className={styles.login_title}>Login</div>
        <form className={styles.login_form} onSubmit={onSubmit}>
          <div className={styles.login_input}>
            <input type="text" placeholder="User Name" ref={idRef} />
            <input type="text" placeholder="Password" ref={passwordRef} />
          </div>
          <button className={styles.login_btn} type="submit">
            Login
          </button>
        </form>
        <div>Don’t have an account? Sign up</div>
        <div>
          <SnsDivider />
        </div>
        <div>
          <button>
            <Facebook />
          </button>
          <button>
            <Twitter />
          </button>
        </div>
      </div>
    </BaseView>
  );
}

export default LoginView;
