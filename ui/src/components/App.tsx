// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import DamlLedger from '@daml/react';
import Credentials, { computeCredentials } from '../Credentials';
import { PublicLedger } from './PublicLedger';
import { httpBaseUrl, publicParty, ledgerId, deploymentMode, DeploymentMode } from '../config';

/**
 * React component for the entry point into the application.
 */
// APP_BEGIN
const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<Credentials | undefined>();

  return <PublicLedger
    publicParty={publicParty}
    ledgerId={ledgerId}
    defaultToken={computeCredentials(publicParty).token}
    dev={deploymentMode !== DeploymentMode.PROD_DABL}>
      { credentials
        ? <DamlLedger
            token={credentials.token}
            party={credentials.party}
            httpBaseUrl={httpBaseUrl}
          >
            <MainScreen onLogout={() => setCredentials(undefined)}/>
          </DamlLedger>
        : <LoginScreen onLogin={setCredentials} /> }
    </PublicLedger>
}
// APP_END

export default App;
