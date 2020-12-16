import React from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';
import { Main } from 'codegen-santa';

type Props = {
}

const MeetingsList: React.FC<Props> = () => {
  return (
    <Segment>
        <Header as='h2'>
        <Image
          src='/undraw_conversation_h12g.svg'
          alt='Gifts'
          size='massive'
        />
        <Header.Content>
            Your Meetings
            <Header.Subheader>Other elves you have met</Header.Subheader>
        </Header.Content>
        </Header>
  </Segment>
  );
}

export default MeetingsList;