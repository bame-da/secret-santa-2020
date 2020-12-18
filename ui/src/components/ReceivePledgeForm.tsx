import React, { useCallback } from 'react';
import { Segment, Header, Image, Divider, Form, Icon } from 'semantic-ui-react';
import { Main } from 'codegen-santa';
import { PledgeResolver } from 'codegen-pledge-resolver';
import { useLedger } from '@daml/react';

type Props = {
    pledge?: [Main.Pledge, boolean]
}

const ReceivePledgeForm: React.FC<Props> = ({pledge}) => {
  const ledger = useLedger();

  const resolve = useCallback(async () => {
    try {
      if(pledge) {
        ledger.createAndExercise(PledgeResolver.GiftReceipt.Resolve_Pledge_With_Receipt, { pledge : pledge[0] }, {});
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
            {`Your Secret Santa` + (pledge ? `: ${pledge?.[0].giverElf}` : '')}
            <Header.Subheader>
              { pledge
              ? `Their gift to you: ${pledge[0].gift}`
              : 'Who could it be?! Keep meeting people to find out.'}
            </Header.Subheader>
        </Header.Content>
      </Header>
      { pledge
      ? pledge[1]
      ? <>
          <Header style={{ verticalAlign: 'middle' }} as='h3'>
            <Icon 
              name='gift'
              color='green'
              size='big' />
            <Header.Content>You have confirmed receipt. Enjoy your gift!</Header.Content>
          </Header>
        </>
      : <>
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