import React from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';
import { Main } from 'codegen-santa';

type Props = {
    elfMatch: Main.ElfMatch
    pledge?: Main.Pledge
}

const GivePledgeForm: React.FC<Props> = ({elfMatch, pledge}) => {
  return (
    <Segment>
        <Header as='h2'>
        <Image
          src='/undraw_gifts_btw0.svg'
          alt='Gifts'
          size='massive'
        />
        <Header.Content>
            Your Gift to TODO
            <Header.Subheader>TODO</Header.Subheader>
        </Header.Content>
        </Header>
  </Segment>
  );
}

export default GivePledgeForm;