// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import DamlLedger from '@daml/react';
import Credentials, { computeCredentials } from '../Credentials';
import { PublicLedger, useStreamQueriesAsPublic } from './PublicLedger';
import { httpBaseUrl, publicParty, ledgerId, deploymentMode, DeploymentMode } from '../config';
import { Main } from 'codegen-santa';

const App: React.FC = () => {

  return <PublicLedger
    publicParty={publicParty}
    ledgerId={ledgerId}
    defaultToken={computeCredentials(publicParty).token}
    dev={deploymentMode !== DeploymentMode.PROD_DABL}>
      <WithPublicLedger/>
    </PublicLedger>
}

const WithPublicLedger: React.FC = () => {
  const [credentials, setCredentials] = React.useState<Credentials | undefined>();
  const secretSantaSignup = useStreamQueriesAsPublic(Main.SecretSantaSignup);
  return (
    credentials
    ? <DamlLedger
        token={credentials.token}
        party={credentials.party}
        httpBaseUrl={httpBaseUrl}
      >
        <MainScreen 
          onLogout={() => setCredentials(undefined)}
          secretSantaSignup={secretSantaSignup}/>
      </DamlLedger>
    : <LoginScreen onLogin={setCredentials} isSignup={secretSantaSignup.contracts.length ? true : false} />
  );
}

export default App;
