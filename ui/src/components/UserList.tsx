// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react'
import { List, Segment, Header, Image, Divider, Label } from 'semantic-ui-react'
import { Main } from 'codegen-santa';
import { useStreamQueriesAsPublic } from './PublicLedger';
import { Party } from '@daml/types';

type Props = {
  party?: Party
}

const UserList: React.FC<Props> = ({party}) => {
  const allElves = useStreamQueriesAsPublic(Main.Elf).contracts;
  const elves = useMemo(() =>
    allElves
    .map(elf => elf.payload)
    .sort((x, y) => x.name.localeCompare(y.name)),
    [allElves]);
  return (
    <Segment>
      <Header as='h2'>
        <Image
          src='/undraw_snowman_1_a2ch.svg'
          alt='Christmas Tree'
          size='big'
        />
        <Header.Content>
          Elves
          <Header.Subheader>Elves currently signed up</Header.Subheader>
        </Header.Content>
      </Header>
      <Divider />
      <List divided relaxed>
        {[...elves].sort((x, y) => x.name.localeCompare(y.name)).map(elf =>
          <List.Item key={elf.name}>
            <List.Icon name='tree' verticalAlign='middle'/>
            <List.Content verticalAlign='middle' >
              <List.Header>
                <span style={{verticalAlign: 'middle'}}>{elf.name}</span>
                { function () {console.log(party, elf.party); return party === elf.party}()
                ? <Label pointing='left' size='mini' color='teal' style={{verticalAlign: 'middle'}}>This is you!</Label>
                : null }
              </List.Header>
            </List.Content>
          </List.Item>
        )}
      </List>
    </Segment>
  );
};

export default UserList;
