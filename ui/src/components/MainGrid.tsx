import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

const MainGrid: React.FC = ({children}) => {
  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            { children }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainGrid;