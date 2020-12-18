// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { useParty, useStreamQueries } from '@daml/react';
import { Main } from 'codegen-santa';
import { PledgeResolver } from 'codegen-pledge-resolver';
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
  const allReceipts = useStreamQueries(PledgeResolver.GiftReceipt);

  const givePledge = useMemo(() =>
    allPledges.contracts
    .map((pledge) : [Main.Pledge, boolean] => [pledge.payload, false])
    .concat(allReceipts.contracts
      .map(receipt => [receipt.payload.pledge, true])
    ).filter(pledge => pledge[0].giverElf === party)[0]
  , [allPledges, allReceipts, party]);

  const receivePledge = useMemo(() =>
    allPledges.contracts
    .map((pledge) : [Main.Pledge, boolean] => [pledge.payload, false])
    .concat(allReceipts.contracts
      .map(receipt => [receipt.payload.pledge, true])
    ).filter(pledge => pledge[0].recipientElf === party)[0]
  , [allPledges, allReceipts, party]);

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

  const recipientElf = elfMatch?.contracts[0]?.payload?.recipientElf || givePledge?.[0].recipientElf;

  return (
    loading
    ? null
    : <>
      { elfMatch.contracts.length === 0 && givePledge === undefined
      ? waiting
      : <> 
        <GivePledgeForm 
          elfMatch={elfMatch?.contracts[0]}
          pledge={givePledge}/>
        <ReceivePledgeForm pledge={receivePledge}/>
        { givePledge
        ?  <MeetingsList 
            secretSanta={secretSanta}
            beneficiary={recipientElf}
            benefactor={receivePledge?.[0].giverElf}/>
        : null }
      </>}
    </>
  );
}

export default MainView;
