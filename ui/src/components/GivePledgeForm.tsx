import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { Main } from 'codegen-santa';

type Props = {
    elfMatch: Main.ElfMatch
    pledge?: Main.Pledge
}

const GivePledgeForm: React.FC<Props> = ({elfMatch, pledge}) => {
  return (
    <Segment>
        <Header as='h2'>
        <Icon name='gift' />
        <Header.Content>
            Your Gift to TODO
            <Header.Subheader>TODO</Header.Subheader>
        </Header.Content>
        </Header>
  </Segment>
  );
}

export default GivePledgeForm;