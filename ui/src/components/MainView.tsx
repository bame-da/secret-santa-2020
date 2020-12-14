// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { Main } from 'codegen-santa';
import { useParty, useStreamQueries } from '@daml/react';
import UserList from './UserList';
import UserSignUp from './UserSignUp';

// USERS_BEGIN
const MainView: React.FC = () => {
  const party = useParty();
  const allElves = useStreamQueries(Main.Elf).contracts;
// USERS_END

  // Sorted list of users that are following the current user
  const elves = useMemo(() =>
    allElves
    .map(elf => elf.payload)
    .sort((x, y) => x.name.localeCompare(y.name)),
    [allElves]);

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
              {/* USERLIST_BEGIN */}
              <UserList
                elves={elves}
              />
              {/* USERLIST_END */}
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
