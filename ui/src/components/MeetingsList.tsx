import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { Main } from 'codegen-santa';

type Props = {
}

const MeetingsList: React.FC<Props> = () => {
  return (
    <Segment>
        <Header as='h2'>
        <Icon name='handshake outline' />
        <Header.Content>
            Your Meetings
            <Header.Subheader>Other elves you have met</Header.Subheader>
        </Header.Content>
        </Header>
  </Segment>
  );
}

export default MeetingsList;