// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { Image, Menu, Segment, Header } from 'semantic-ui-react'
import SignupView from './SignupView';
import { useParty, useStreamQueries, QueryResult } from '@daml/react';
import { Main } from 'codegen-santa';
import MainGrid from './MainGrid';
import MainView from './MainView';


type Props = {
  onLogout: () => void,
  secretSantaSignup: QueryResult<Main.SecretSantaSignup, Main.SecretSantaSignup.Key, typeof Main.SecretSantaSignup.templateId>,
}

const MainScreen: React.FC<Props> = ({onLogout, secretSantaSignup}) => {
  const secretSanta = useStreamQueries(Main.SecretSanta);

  return (
    <>
      <Menu icon borderless>
        <Menu.Item>
          <Image
            src='/undraw_christmas_tree_56sw.svg'
            alt='Christmas Tree'
            size='mini'
          />
        </Menu.Item>
        <Menu.Menu position='right' className='test-select-main-menu'>
          <Menu.Item position='right'>
            You are logged in as {useParty()}.
          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
            className='test-select-log-out'
            onClick={onLogout}
            icon='log out'
          />
        </Menu.Menu>
      </Menu>
      <MainGrid>
        { secretSantaSignup.loading
        ? <></>
        : secretSantaSignup.contracts[0]
        ? <SignupView
            secretSantaSignup={secretSantaSignup.contracts[0]}/>
        : secretSanta.loading
        ? <></>
        : secretSanta.contracts[0]
        ? <MainView/>
        : <Segment raised>
            <Header as='h1'>
              <Image
                src='/undraw_santa_claus_q0g4.svg'
                alt='Santa'
                spaced
                size='small'
                verticalAlign='middle'
              />
              <Header.Content>
                There's nothing here for you :(
                <Header.Subheader>See you for signups next year!</Header.Subheader>
              </Header.Content>
            </Header>
          </Segment> }
      </MainGrid>
    </>
  );
};

export default MainScreen;
