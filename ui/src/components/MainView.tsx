// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import UserList from './UserList';
import UserSignUp from './UserSignUp';

// USERS_BEGIN
const MainView: React.FC = () => {
  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as='h2'>
                <Icon name='snowflake' />
                <Header.Content>
                  Elves
                  <Header.Subheader>People already participating</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <UserList/>
            </Segment>
            <UserSignUp>
            </UserSignUp>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
