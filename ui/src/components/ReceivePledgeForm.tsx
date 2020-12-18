import React, { useCallback } from 'react';
import { Segment, Header, Image, Divider, Form } from 'semantic-ui-react';
import { Main } from 'codegen-santa';
import { useLedger } from '@daml/react';

type Props = {
    pledge?: Main.Pledge.CreateEvent
}

const ReceivePledgeForm: React.FC<Props> = ({pledge}) => {
  const ledger = useLedger();

  const resolve = useCallback(async () => {
    try {
      if(pledge) {
        ledger.exerciseByKey(Main.Pledge.Resolve, pledge.key, { resolver: pledge.payload.recipientElf });
      } else
        throw new Error("Can't resolve without a pledge.")
    } catch(error) {
      alert(`Unknown error:\n${error}`);
    }
  }, [pledge, ledger]);

  const handleResolve = async (event: React.FormEvent) => {
    event.preventDefault();
    await resolve();
  }

  return (
    <Segment>
        <Header as='h2'>
        <Image
          src='/undraw_santa_visit_loux.svg'
          alt='Gifts'
          size='massive'
        />
        <Header.Content>
            {`Your Secret Santa` + (pledge ? `: ${pledge?.payload.giverElf}` : '')}
            <Header.Subheader>
              { pledge
              ? `Their gift to you: ${pledge.payload.gift}`
              : 'Who could it be?! Keep meeting people to find out.'}
            </Header.Subheader>
        </Header.Content>
      </Header>
      { pledge
      ? <>
          <Divider/>
          <Form>
            <Form.Button
              primary
              fluid
              onClick={handleResolve}>
              Confirm Receipt
            </Form.Button>
          </Form>
        </>
      : null }
  </Segment>
  );
}

export default ReceivePledgeForm;