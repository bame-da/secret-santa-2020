// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import Credentials, { computeCredentials } from '../Credentials';
import UserList from './UserList';
import { DeploymentMode, deploymentMode, ledgerId} from '../config';
import { useEffect } from 'react';

type Props = {
  onLogin: (credentials: Credentials) => void;
  isSignup?: boolean
}

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC<Props> = ({onLogin, isSignup}) => {
  const [username, setUsername] = React.useState('');

  const login = useCallback(async (credentials: Credentials) => {
    try {
      onLogin(credentials);
    } catch(error) {
      alert(`Unknown error:\n${error}`);
    }
  }, [onLogin]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = computeCredentials(username);
    await login(credentials);
  }

  const handleDablLogin = () => {
    window.location.assign(`https://login.projectdabl.com/auth/login?ledgerId=${ledgerId}`);
  }

  useEffect(() => {
    const url = new URL(window.location.toString());
    const token = url.searchParams.get('token');
    if (token === null) {
      return;
    }
    const party = url.searchParams.get('party');
    if (party === null) {
      throw Error("When 'token' is passed via URL, 'party' must be passed too.");
    }
    url.search = '';
    window.history.replaceState(window.history.state, '', url.toString());
    login({token, party, ledgerId});
  }, [login]);

  return (
    <Grid textAlign='center' columns={1} style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column textAlign='left' width={8}>
        <Header as='h1' textAlign='center' size='huge' style={{color: '#223668'}}>
          <Header.Content>
            Secret
            <Image
              src='/undraw_santa_claus_q0g4.svg'
              alt='Santa'
              spaced
              size='small'
              verticalAlign='middle'
            />
            2020
          </Header.Content>
        </Header>
        <Form size='large' className='test-select-login-screen'>
          <Segment>
            {deploymentMode !== DeploymentMode.PROD_DABL
            ? <>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  value={username}
                  className='test-select-username-field'
                  onChange={e => setUsername(e.currentTarget.value)}
                />
                <Button
                  primary
                  fluid
                  className='test-select-login-button'
                  onClick={handleLogin}>
                  Log in
                </Button>
              </>
            : <Button primary fluid onClick={handleDablLogin}>
                Log in with DABL
              </Button>
            }
          </Segment>
        </Form>
        { isSignup 
        ? <Segment>
            <Header as='h1'>
              <Image
                src='/undraw_time_management_30iu.svg'
                alt='Gifts'
                size='massive'
              />
              <Header.Content>
                Only {(new Date(2020, 11, 18).getDate() - new Date().getDate())} days left to sign up!
              </Header.Content>
            </Header>
          </Segment>
        : ''}
        <UserList/>
      </Grid.Column>
    </Grid>
  );
};

export default LoginScreen;
