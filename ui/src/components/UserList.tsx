// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react'
import { List, Segment, Header, Icon, Divider } from 'semantic-ui-react'
import { Main } from 'codegen-santa';
import { useStreamQueriesAsPublic } from './PublicLedger';

type Props = {
}

/**
 * React component to display a list of `User`s.
 * Every party in the list can be added as a friend.
 */
const UserList: React.FC<Props> = () => {
  const allElves = useStreamQueriesAsPublic(Main.Elf).contracts;
  // USERS_END
  
    // Sorted list of users that are following the current user
    const elves = useMemo(() =>
      allElves
      .map(elf => elf.payload)
      .sort((x, y) => x.name.localeCompare(y.name)),
      [allElves]);
  return (
    <Segment>
      <Header as='h2'>
        <Icon name='snowflake' />
        <Header.Content>
          Elves
          <Header.Subheader>Elves currently signed up</Header.Subheader>
        </Header.Content>
      </Header>
      <Divider />
      <List divided relaxed>
        {[...elves].sort((x, y) => x.name.localeCompare(y.name)).map(elf =>
          <List.Item key={elf.name}>
            <List.Icon name='tree' />
            <List.Content>
              <List.Header>{elf.name}</List.Header>
            </List.Content>
          </List.Item>
        )}
      </List>
    </Segment>
  );
};

export default UserList;
