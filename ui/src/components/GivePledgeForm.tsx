import React, { useCallback, useState } from 'react';
import { Segment, Header, Image, Divider, List, Button, Form } from 'semantic-ui-react';
import { Main } from 'codegen-santa';
import { useLedger } from '@daml/react';

type Props = {
  elfMatch?: Main.ElfMatch.CreateEvent
  pledge?: [Main.Pledge, boolean]
  elvesMap: { [key: string] : string }
}

const GivePledgeForm: React.FC<Props> = ({ elfMatch, pledge, elvesMap }) => {
  const [gift, setGift] = useState(pledge?.[0].gift || "");
  const ledger = useLedger();

  const penaltyDate = new Date(2020, 12, 25).getDate();
  const daysLeft = Math.max((penaltyDate - new Date().getDate()), 0);

  const makePledge = useCallback(async () => {
    if(elfMatch)
      await ledger.exerciseByKey(Main.ElfMatch.Make_Pledge, elfMatch.key, { gift })
    else
       throw new Error("Can't make pledge without an ElfMatch contract.")
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

  const recipientElfParty = (elfMatch?.payload || pledge?.[0])?.recipientElf;
  const recipientElf = recipientElfParty ? elvesMap[recipientElfParty] : null;

  return (
    <Segment>
      <Header as='h2'>
        <Image
          src='/undraw_gifts_btw0.svg'
          alt='Gifts'
          size='massive'
        />
        <Header.Content>
          {`Your Gift to ${recipientElf}` + (pledge ? `: ${pledge?.[0].gift}` : '')}
          <Header.Subheader>{pledge ? "That's a great choice!" : "Try to come up with a personalized Gift"}</Header.Subheader>
        </Header.Content>
      </Header>
      <Divider />
      <List divided relaxed verticalAlign='middle'>
        {pledge ?
          <List.Item>
            <List.Icon 
              name={pledge[1] ? 'gift' : pledge[0].revealed ? 'eye' : 'eye slash'}
              color={pledge[1] ? 'green' : pledge[0].revealed ? 'yellow' : 'red'}
              size='big' />
            <List.Content verticalAlign='middle' >
              <List.Header style={{ verticalAlign: 'middle' }} as='h3'>
              { pledge[1]
              ? `${recipientElf} has confirmed receipt. They must have been happy!`
              : pledge[0].revealed
              ? `${recipientElf} knows what they are getting, but hasn't confirmed receipt`
              : `${recipientElf} doesn't know about the present yet` }
              </List.Header>
            </List.Content>
          </List.Item>
          :
          <>
            <List.Item>
              <List.Icon name='clock outline' size='big' />
              <List.Content verticalAlign='middle' >
                <List.Header style={{ verticalAlign: 'middle' }} as='h3'>
                  <span>Only {daysLeft} days until Santa chooses for you!</span>
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <Button
                  disabled={gift === ""}
                  label="Pledge"
                  labelPosition='left'
                  icon="envelope"
                  color="blue"
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