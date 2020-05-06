import React, { useState } from 'react';

import THeader from '../Header/THeader';
import * as constants from '../../constants/constants';
import { Header, Icon, Divider, Segment, Button, Grid, Loader } from 'semantic-ui-react';


const Converter = (props) => {

    const fileInputRef = React.createRef();

    const [fileData, setFileData] = useState(null);
    const [activeLoader, setActiveLoader] = useState(false);
    const [resultDiv, setResultDiv] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const custom_style = {
        border: 'none',
        backgroundColor: 'transparent'
    };

    const exchangeFile = () => {

        const file_type = fileData.name.split('.').pop();
        // const file_type = "";

        // console.log(fileData);

        if (file_type === props.file_type) {

            setActiveLoader(true);

            let url = constants.BACKEND_BASE_URL + constants.CSV_TO_JSON_URL;

            var data = new FormData();
            data.append('file', fileData);

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: data
            }).then(response => response.json())
                .then(responseData => {
                    if (responseData.error) {
                        // console.log(responseData.error.message.file);
                        generateErrorDiv(responseData.error.message.file);
                        setActiveLoader(false);
                    }
                    else {
                        console.log(responseData);
                        generateResultDiv(responseData);
                        setActiveLoader(false);
                    }

                }).catch((err) => {
                    console.log(err);
                    // generateErrorDiv(err.error.message.file);
                });
        } else {
            setActiveLoader(false);
            generateErrorDiv("This file formate is not supported");

        }
    }

    const generateErrorDiv = (err_msg) => {
        let er = (
            <Segment inverted color='red'>
                {err_msg}
            </Segment>
        );
        setErrorMsg(er);
    }

    const generateResultDiv = (responseData) => {
        let div = (
            <Segment size="massive" textAlign='center'>
                <Grid columns='three' divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h2'>File</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Button as="a" href={responseData.data.file_path} inverted color='orange' content='Download' icon='download' labelPosition='right' />
                        </Grid.Column>
                        <Grid.Column>

                            <p>{responseData.data.file_size}</p>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );

        setResultDiv(div);
    }

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
                                    {props.page_title}
                                </Header>
                            </Grid.Row>

                            <Grid.Row>
                                <Button
                                    basic
                                    color='orange'
                                    icon='upload'
                                    size="massive"
                                    onClick={() => fileInputRef.current.click()}
                                    label={{
                                        as: 'a',
                                        basic: true,
                                        color: 'orange',
                                        pointing: 'left',
                                        content: 'Upload File',
                                    }}
                                />

                                {errorMsg}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    hidden
                                    onChange={e => setFileData(e.target.files[0])}
                                />
                            </Grid.Row>


                            <Divider clearing />

                            <Button color='orange' icon size='massive' onClick={exchangeFile}>
                                <Icon name='exchange' />
                            </Button>

                            <br />

                            <Loader style={{ marginTop: '1rem' }} active={activeLoader} inline='centered' />

                            {resultDiv}


                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </React.Fragment>
    )
}


export default Converter;