import React, { useCallback, useState } from 'react';
import { Segment, Header, Image, Divider, Label, List, Button, Form, Icon } from 'semantic-ui-react';
import { Main } from 'codegen-santa';
import { useLedger } from '@daml/react';

type Props = {
  elfMatch: Main.ElfMatch.CreateEvent
  pledge?: Main.Pledge
}

const GivePledgeForm: React.FC<Props> = ({ elfMatch, pledge }) => {
  const [gift, setGift] = useState(pledge?.gift || "");
  const ledger = useLedger();

  const penaltyDate = new Date(2020, 12, 25).getDate();
  const daysLeft = Math.max((penaltyDate - new Date().getDate()), 0);

  const makePledge = useCallback(async () => {
     await ledger.exercise(Main.ElfMatch.Make_Pledge, elfMatch.contractId, { gift });
  }, [elfMatch, ledger, gift]);

  const handleMakePledge = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!pledge) {
        makePledge();
      }
    } catch (error) {
      alert(`Unknown error:\n${error}`);
      console.error(error);
    }
  }

  const recipientElf = (elfMatch?.payload || pledge).recipientElf;

  return (
    <Segment>
      <Header as='h2'>
        <Image
          src='/undraw_gifts_btw0.svg'
          alt='Gifts'
          size='massive'
        />
        <Header.Content>
          Your Gift to {recipientElf}
          <Header.Subheader>{pledge ? "That's a great choice!" : "Try to come up with a personalized Gift"}</Header.Subheader>
        </Header.Content>
      </Header>
      <Divider />
      <List divided relaxed verticalAlign='middle'>
        {pledge ?

          <List.Item>
            <List.Icon name='gift' size='big' />
            <List.Content verticalAlign='middle' >
              <List.Header style={{ verticalAlign: 'middle' }} as='h3'>
                <span>Your pledged gift to {recipientElf} is: {pledge.gift}</span>
              </List.Header>
              {pledge.revealed === false ?
                <span><Icon name="eye slash" color="red" /> {recipientElf} doesn't know about the present yet</span>
                :
                <span><Icon name="eye" color="green" /> {recipientElf} must have been happy to learn about the present</span>
              }
            </List.Content>
          </List.Item>
          :
          <>
            <List.Item>
              <List.Icon name='gift' size='big' />
              <List.Content verticalAlign='middle' >
                <List.Header style={{ verticalAlign: 'middle' }} as='h3'>
                  <span>Hurry up and pledge a gift to {recipientElf}!</span>
                  <Label style={{ verticalAlign: 'middle' }} pointing='left' color='red'>Only {daysLeft} days left!</Label>
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <Button
                  enabled={pledge === undefined}
                  label="Pledge"
                  labelPosition='left'
                  icon="envelope"
                  color="grey"
                  onClick={handleMakePledge}
                >
                </Button>
              </List.Content>
              <List.Content verticalAlign='middle' >
                <Form.Input
                  fluid
                  icon='gift'
                  iconPosition='left'
                  placeholder='Pledge'
                  value={gift}
                  onChange={e => setGift(e.currentTarget.value)}
                />

              </List.Content>
            </List.Item>
          </>
        }
      </List>
    </Segment>
  );
}

export default GivePledgeForm;