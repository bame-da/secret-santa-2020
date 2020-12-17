import React, { useMemo, useCallback } from 'react';
import { Segment, Header, Image, Divider, List, Label, Button, Icon } from 'semantic-ui-react';
import { Main } from 'codegen-santa';
import  { useStreamQueriesAsPublic } from './PublicLedger';
import { useParty, useLedger } from '@daml/react';
import { Party } from '@daml/types';

type Props = {
  secretSanta : Main.SecretSanta.CreateEvent,
  beneficiary : Party,
  benefactor? : Party
}

interface IHash { [key : string] : number; };

const MeetingsList: React.FC<Props> = ({secretSanta, beneficiary, benefactor}) => {
  console.log(benefactor, beneficiary)
  const ledger = useLedger();
  const party = useParty();
  const allElves = useStreamQueriesAsPublic(Main.Elf).contracts;
  const allMeetings = useStreamQueriesAsPublic(Main.ElfMeeting).contracts;

  const meet = useCallback(async (elf : Main.Elf) => {
    await ledger.exercise(Main.SecretSanta.Claim_Meeting, secretSanta.contractId,
      {
        elf: party,
        metElf: elf.party
      });
  }, [secretSanta, party, ledger]);

  const handleMeet = (elf : Main.Elf) => { 
    return async (event: React.FormEvent) => {
      event.preventDefault();
      try{
        if(elf.party !== beneficiary || window.confirm(`${elf.name} is your beneficiary. Saying you met them will reveal your pledge. Do you want to continue?`)) {
          await meet(elf);
        }
      }catch(error) {
        alert(`Unknown error:\n${error}`);
        console.error(error);
      }
    } 
  }

  const elves = useMemo(() =>
    allElves
    .map(elf => elf.payload)
    .filter(elf => elf.party !== party && secretSanta.payload.elves.includes(elf.party))
    .sort((x, y) => x.name.localeCompare(y.name)),
    [allElves, secretSanta, party]);

  // Statuses
  // 0 = not met
  // 1 = logged in user claims meeting
  // 2 = other user claims meeting
  // 3 = mutual agreement on meeting
  const meetingStatus = useMemo(() => {
    let ret : IHash = {};
    elves.forEach(elf => {ret[elf.party] = 0;})
    allMeetings
      .map(meeting => meeting.payload)
      .forEach(meeting => {
        if(meeting.elf = party) ret[meeting.metElf] = ret[meeting.metElf] + 1
        else ret[meeting.elf] = ret[meeting.elf] + 2
      })
      return ret;
  }, [allMeetings, elves, party])

  function hasMet (elf : Main.Elf) : boolean {
    return meetingStatus[elf.party] % 2 == 1
  }

  function getMetLabelColor (elf : Main.Elf) {
    switch (meetingStatus[elf.party]) {
      case 0:
        return 'grey';
      case 1:
        return 'blue';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      default:
        return 'red';
    }
  }

  function getMetLabelMessage (elf : Main.Elf) {
    switch (meetingStatus[elf.party]) {
      case 0:
        return 'Not met';
      case 1:
        return 'You say you met';
      case 2:
        return 'They say you met';
      case 3:
        return 'Met';
      default:
        return 'Unknown';
    }
  }

  return (
    <Segment>
        <Header as='h2'>
        <Image
          src='/undraw_conversation_h12g.svg'
          alt='Gifts'
          size='massive'
        />
        <Header.Content>
          Meet Elves to Give and Receive
          <Header.Subheader>Try to give (or reveal) your gift in person!</Header.Subheader>
        </Header.Content>
        </Header>
        <Divider />
        <List divided relaxed verticalAlign='middle'>
          {[...elves].sort((x, y) => x.name.localeCompare(y.name)).map(elf =>
            <List.Item key={elf.party}>
              <List.Content floated='right'>
                <Button
                  disabled={hasMet(elf)}
                  color={getMetLabelColor(elf)}
                  label={getMetLabelMessage(elf)}
                  labelPosition='left'
                  icon={hasMet(elf) ? 'check' : 'handshake outline'}
                  onClick={handleMeet(elf)}
                >
                </Button>
              </List.Content>
              <List.Icon name='tree' size='big'/>
              <List.Content verticalAlign='middle' >
                <List.Header style={{verticalAlign: 'middle'}} as='h3'>
                  <span>{elf.name}</span>
                  { elf.party === beneficiary
                  ? <Label style={{verticalAlign: 'middle'}} pointing='left' color='green'>Your beneficiary!</Label>
                  : null }
                  { elf.party === benefactor
                  ? <Label pointing='left' color='red'>Your secret santa!</Label>
                  : null }
                </List.Header>
              </List.Content>
            </List.Item>
          )}
        </List>
  </Segment>
  );
}

export default MeetingsList;