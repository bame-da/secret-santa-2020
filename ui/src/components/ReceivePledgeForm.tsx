import React from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';
import { Main } from 'codegen-santa';

type Props = {
    pledge?: Main.Pledge
}

const ReceivePledgeForm: React.FC<Props> = ({pledge}) => {
  return (
    <Segment>
        <Header as='h2'>
        <Image
          src='/undraw_santa_visit_loux.svg'
          alt='Gifts'
          size='massive'
        />
        <Header.Content>
            Your Secret Santa
            <Header.Subheader>TODO</Header.Subheader>
        </Header.Content>
        </Header>
  </Segment>
  );
}

export default ReceivePledgeForm;