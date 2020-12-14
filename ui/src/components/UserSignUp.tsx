// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import { Label, Form, Button, Segment, Header, Icon, Divider } from 'semantic-ui-react'
import { Main } from 'codegen-santa';
import { useParty, useStreamQueries, useLedger } from '@daml/react';
import { useStreamQueriesAsPublic } from './PublicLedger';

type Props = {
}

const UserSignUp: React.FC<Props> = () => {
  const [username, setUsername] = React.useState('');
  const ledger = useLedger();
  const party = useParty();
  const secretSanta = useStreamQueriesAsPublic(Main.SecretSantaSignup).contracts[0]?.payload;
  const myElf = useStreamQueries(Main.Elf, () => [{party}]).contracts[0]?.payload;
  const mySignupHelper = useStreamQueries(Main.SecretSantaSignupHelper, () => [{party}]).contracts[0]?.payload;

  const signup = useCallback(async () => {
    try {
      await ledger.create(Main.SecretSantaSignupHelper, 
        {
          santa: secretSanta.santa,
          holidayRegulator: secretSanta.holidayRegulator,
          party: party,
          name: username
        });
    } catch(error) {
      alert(`Unknown error:\n${error}`);
    }
  }, [ledger, secretSanta, party, username]);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    await signup();
  }

  return (
    myElf
    ? null
    : <Segment>
      <Header as='h2'>
        <Icon name='gift' />
        <Header.Content>
          Sign up
          <Header.Subheader>Give the gift of giving</Header.Subheader>
        </Header.Content>
      </Header>
      <Divider />
      {mySignupHelper
      ? <Label>Signup pending</Label>
      : <>
        {/* FORM_BEGIN */}
        <Form.Input
          fluid
          icon='tree'
          iconPosition='left'
          placeholder='Your name...'
          value={username}
          className='test-select-username-field'
          onChange={e => setUsername(e.currentTarget.value)}
        />
        <Button
          primary
          fluid
          className='test-select-login-button'
          onClick={handleSignup}>
          Sign Up
        </Button>
        {/* FORM_END */}
      </>}
    </Segment>
  );
};

export default UserSignUp;
