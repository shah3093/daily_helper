import React from 'react';

import THeader from '../Header/THeader';
import { Header, Icon, Divider, Segment, Button, Input, Grid, Loader } from 'semantic-ui-react';


const Converter = (props) => {

    const custom_style = {
        border: 'none',
        backgroundColor: 'transparent'
    };

    return (
        <React.Fragment>

            <THeader />
            <Divider />

            <Segment style={custom_style} >
                <Grid columns={2} textAlign='center'>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>

                            <Grid.Row>
                                <Header icon>
                                    <Icon name='cloud upload' />
                                    {/* {props.page_title} */}
                                Convert Json to CSV
                                </Header>
                            </Grid.Row>

                            <Grid.Row>
                                <Button
                                    basic
                                    color='orange'
                                    icon='upload'
                                    size="massive"
                                    label={{
                                        as: 'a',
                                        basic: true,
                                        color: 'orange',
                                        pointing: 'left',
                                        content: 'Upload File',
                                    }}
                                />
                            </Grid.Row>


                            <Divider clearing />

                            <Button color='orange' icon size='massive' >
                                <Icon name='exchange' />
                            </Button>

                            {/* <Divider clearing /> */}

                            <br />

                            <Loader style={{ marginTop: '1rem' }} active inline='centered' />

                            {/* {resultDiv} */}

                            <Segment size="massive" textAlign='center'>

                                <Grid columns='three' divided>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header as='h2'>File</Header>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Button as="a" href="#" inverted color='orange' content='Download' icon='download' labelPosition='right' />
                                        </Grid.Column>
                                        <Grid.Column>

                                            <p>140 MB</p>

                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>


                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </React.Fragment>
    )
}


export default Converter;