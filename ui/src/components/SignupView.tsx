// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import UserList from './UserList';
import UserSignUp from './UserSignUp';
import { Main } from 'codegen-santa';
import { useParty } from '@daml/react';

type Props = {
  secretSantaSignup: Main.SecretSantaSignup.CreateEvent
}

const SignupView: React.FC<Props> = ({secretSantaSignup}) => {
  const party = useParty();
  return (
    <>
      <UserSignUp secretSantaSignup={secretSantaSignup}/>
      <UserList party={party}/>
    </>
  );
}

export default SignupView;
