import React from 'react';

import { Header, Icon, Divider, Grid, Container, Card } from 'semantic-ui-react';


import ActionCard from '../../components/ActionCard/ActionCard';
import THeader from '../../components/Header/THeader';

const Home = (props) => {


    return (
        <React.Fragment>

            <Container>

                <THeader />


                <Divider />

                {/* <Download_img /> */}

                <Card.Group centered>
                    <ActionCard links="/download-img" header="Download" subheader="Website images" btntitle="GO" />
                    <ActionCard links="/download-img" header="CSV to Array" subheader="Convert" btntitle="GO" />
                    <ActionCard links="/download-img" header="Json to Array" subheader="Convert" btntitle="GO" />
                    <ActionCard links="/download-img" header="CSV to Json" subheader="Convert" btntitle="GO" />
                    <ActionCard links="/download-img" header="Json to CSV" subheader="Convert" btntitle="GO" />
                </Card.Group>



            </Container>

        </React.Fragment>
    )
}


export default Home;
