import React, { useState } from 'react';

import { Header, Icon, Divider, Segment, Button, Input, Grid, Loader } from 'semantic-ui-react';

import * as constants from '../../constants/constants';
import THeader from '../../components/Header/THeader';

const DownloadImg = () => {

    const [urlValue, setUrlValue] = useState(null);
    const [inputStatus, setInputStatus] = useState(false);
    const [activeLoader, setActiveLoader] = useState(false);
    const [resultDiv, setResultDiv] = useState(false);


    const custom_style = {
        border: 'none',
        backgroundColor: 'transparent'
    };

    const getImages = () => {

        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

        setResultDiv(null);

        if (urlValue) {
            if (urlValue.includes("http://localhost:3000/")) {
                console.log(urlValue);
                setInputStatus(false);
                setActiveLoader(false);
                return;
            }
        }


        if (!re.test(urlValue)) {
            console.log("url error");
            setInputStatus(true);
            setUrlValue(null);
            setActiveLoader(false);
            return false;
        } else {
            console.log(urlValue);
            setInputStatus(false);
            setActiveLoader(true);

            let url = constants.BACKEND_BASE_URL + constants.DOWNLOAD_WEBSITE_IMG_URL + "url=" + urlValue;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
            }).then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    generateResultDiv(responseData);
                    setActiveLoader(false);
                    // dispatch(showing(responseData.data));
                }).catch((err) => {
                    // dispatch(showingError(err.message));
                    console.log(err);
                    setInputStatus(true);
                });
        }


    }

    const generateResultDiv = (responseData) => {
        let div = (
            <Segment size="massive" textAlign='center'>

                <Grid columns='three' divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h2'>Images</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Button as="a" href={responseData.data.file_path} inverted color='orange' content='Download' icon='download' labelPosition='right' />
                        </Grid.Column>
                        <Grid.Column>

                            <Grid columns='2' divided>
                                <Grid.Row>
                                    <Grid.Column>
                                        <p>{responseData.data.file_size}</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <p>{responseData.data.total_img} images</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

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
                            <Header icon>
                                <Icon name='cloud download' />

                                Download website images
                            </Header>

                            <Input error={inputStatus} onChange={e => setUrlValue(e.target.value)} fluid focus placeholder='Enter URL ...' />

                            <Divider clearing />

                            <Button onClick={getImages} color='orange' icon size='massive' >
                                <Icon name='download' />
                            </Button>

                            {/* <Divider clearing /> */}

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

export default DownloadImg;
