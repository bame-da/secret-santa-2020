// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import UserList from './UserList';
import UserSignUp from './UserSignUp';
import { Main } from 'codegen-santa';

type Props = {
  secretSantaSignup: Main.SecretSantaSignup.CreateEvent
}

const SignupView: React.FC<Props> = ({secretSantaSignup}) => {
  return (
    <>
      <UserSignUp secretSantaSignup={secretSantaSignup}/>
      <UserList/>
    </>
  );
}

export default SignupView;
