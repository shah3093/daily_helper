import React from 'react';

import { Header, Icon, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const THeader = () => {
    return (
        <React.Fragment>

            <Link to="/">
                <Header as='h2' icon textAlign='center'>
                    <Icon name='settings' circular />
                    <Header.Content>Daily Helper</Header.Content>
                </Header>
            </Link>


        </React.Fragment>
    )
}


export default THeader;