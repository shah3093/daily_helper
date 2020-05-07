import React from 'react';
import Converter from '../../components/Converter/Converter';
import * as constants from '../../constants/constants';

const JsonToCsv = () => {
    return (
        <React.Fragment>
            <Converter link_url={constants.JSON_TO_CSV_URL} file_type="json" page_title="Convert Json to CSV" />
        </React.Fragment>
    )
}


export default JsonToCsv