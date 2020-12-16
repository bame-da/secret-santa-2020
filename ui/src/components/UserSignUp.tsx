// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react'
import { Label, Form, Button, Segment, Header, Icon, Divider } from 'semantic-ui-react'
import { Main } from 'codegen-santa';
import { useStreamQueries, useLedger } from '@daml/react';
import { Party } from '@daml/types';

type Props = {
  secretSantaSignup: Main.SecretSantaSignup.CreateEvent
  party: Party
}

const UserSignUp: React.FC<Props> = ({secretSantaSignup, party}) => {
  const [username, setUsername] = React.useState('');
  const ledger = useLedger();
  const myElf = useStreamQueries(Main.Elf, () => [{party}]).contracts[0];
  const mySignupHelper = useStreamQueries(Main.SecretSantaSignupHelper, () => [{party}]).contracts[0];

  const signup = useCallback(async () => {
    await ledger.create(Main.SecretSantaSignupHelper, 
      {
        santa: secretSantaSignup.payload.santa,
        holidayRegulator: secretSantaSignup.payload.holidayRegulator,
        party: party,
        name: username
      });
  }, [ledger, party, username, secretSantaSignup]);

  const retract = useCallback(async () => {
    await ledger.archive(Main.SecretSantaSignupHelper, mySignupHelper.contractId);
  }, [ledger, mySignupHelper]);

  const changeName = useCallback(async () => {
    await ledger.exercise(Main.Elf.Elf_ChangeName, myElf.contractId,
      {
        newName: username
      });
  }, [ledger, username, myElf]);

  const handle = (fn : () => Promise<void> ) => { 
    return async (event: React.FormEvent) => {
      event.preventDefault();
      try{
        await fn();
      }catch(error) {
        alert(`Unknown error:\n${error}`);
        console.error(error);
      }
    } 
  }

  return (
    <Segment>
      <Header as='h2'>
        <Icon name='gift' />
        <Header.Content>
          {`Sign up - only ${new Date(2020, 11, 18).getDate() - new Date().getDate()} days left!`}
          <Header.Subheader>Give the gift of giving</Header.Subheader>
        </Header.Content>
      </Header>
      <Label attached="top right"
        color={myElf ? 'green' : mySignupHelper ? 'blue' : 'grey'}>
        {myElf ? 'Signed up' : mySignupHelper ? 'Pending' : 'Not signed up'}
      </Label>
      <Divider />
      <span>
        { myElf
        ? `You are signed up as ${myElf?.payload.name}.`
        : mySignupHelper
        ? `You requested sign-up as ${mySignupHelper?.payload.name}.`
        : `Enter your real name to sign up.`}
      </span>
      <>
        { mySignupHelper
        ? ''
        : <Form.Input
          fluid
          icon='tree'
          iconPosition='left'
          placeholder='Your name...'
          value={username}
          className='test-select-username-field'
          onChange={e => setUsername(e.currentTarget.value)}
          />
        }
        <Button
          primary
          fluid
          className='test-select-login-button'
          disabled={mySignupHelper ? false : username === ""}
          onClick={handle(myElf ? changeName : mySignupHelper ? retract : signup)}>
          {myElf ? 'Change Name' : mySignupHelper ? 'Retract' : 'Sign Up'}
        </Button>
      </>
    </Segment>
  );
};

export default UserSignUp;
