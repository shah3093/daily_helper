import React from 'react';

import { Header, Icon, Grid} from 'semantic-ui-react';

const THeader = () => {
    return (
        <React.Fragment>

            <Grid centered columns={2}>
                <Grid.Column>
                    <Header as='h2' icon>
                        <Icon name='settings' />
                    Daily Helper
                    <Header.Subheader>
                            Manage your account settings and set e-mail preferences.
                    </Header.Subheader>
                    </Header>

                </Grid.Column>
            </Grid>

        </React.Fragment>
    )
}


export default THeader;