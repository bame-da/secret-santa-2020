// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { useParty, useStreamQueries } from '@daml/react';
import { Main } from 'codegen-santa';
import { Segment, Header, Image } from 'semantic-ui-react';
import GivePledgeForm from './GivePledgeForm';
import ReceivePledgeForm from './ReceivePledgeForm';
import MeetingsList from './MeetingsList';

type Props = {
  secretSanta : Main.SecretSanta.CreateEvent
}

const MainView: React.FC<Props> = ({secretSanta}) => {
  const party = useParty();
  const elfMatch = useStreamQueries(Main.ElfMatch);
  const allPledges = useStreamQueries(Main.Pledge);

  const givePledge = useMemo(() =>
    allPledges.contracts
    .map(pledge => pledge.payload)
    .filter(pledge => pledge.giverElf === party)[0]
  , [allPledges]);

  const receivePledge = useMemo(() =>
    allPledges.contracts
    .map(pledge => pledge.payload)
    .filter(pledge => pledge.recipientElf === party)[0]
  , [allPledges]);

  const loading = useMemo(() => 
    elfMatch.loading || allPledges.loading
    , [elfMatch, allPledges]);

  const waiting = <Segment>
    <Header as='h2'>
      <Image
        src='/undraw_santa_claus_q0g4.svg'
        alt='Santa'
        size='massive'
      />
      <Header.Content>
        Waiting for Santa...
        <Header.Subheader>Signups are over, but you haven't been matched yet.</Header.Subheader>
      </Header.Content>
    </Header>
  </Segment>

  return (
    loading
    ? null
    : <>
      { elfMatch.contracts.length == 0
      ? waiting
      : <> 
        <GivePledgeForm elfMatch={elfMatch.contracts[0].payload} pledge={givePledge}/>
        <ReceivePledgeForm pledge={receivePledge}/>
        <MeetingsList 
          secretSanta={secretSanta}
          beneficiary={elfMatch.contracts[0].payload.recipientElf}
          benefactor={receivePledge?.giverElf}/>
      </>}
    </>
  );
}

export default MainView;
