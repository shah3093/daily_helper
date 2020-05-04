import React from 'react';

import { Header, Grid, Button, Card, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const ActionCard = (props) => {


    const square = {
        width: 175,
        height: 175,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border:'2px solid #ff851b'
    };

    return (
        <React.Fragment>

            <Card >
                <Card.Content >
                    <Grid textAlign='center' verticalAlign='middle' >
                        <Grid.Row>
                            <Segment circular style={square}>
                                <Header as='h2'>
                                    {props.header}
                                    <Header.Subheader>
                                        {props.subheader}
                                    </Header.Subheader>
                                </Header>
                            </Segment>

                        </Grid.Row>
                        <Grid.Row style={{ display: 'block' }}>
                            <Button as={Link} to={props.links} size='large' fluid color='orange' inverted>
                                {props.btntitle}
                            </Button>
                        </Grid.Row>
                    </Grid>

                </Card.Content>
            </Card>


        </React.Fragment>
    )
}

export default ActionCard;
