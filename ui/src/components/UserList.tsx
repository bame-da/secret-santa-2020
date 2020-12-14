// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { Main } from 'codegen-santa';

type Props = {
  elves: Main.Elf[];
}

/**
 * React component to display a list of `User`s.
 * Every party in the list can be added as a friend.
 */
const UserList: React.FC<Props> = ({elves}) => {
  return (
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
  );
};

export default UserList;
