import React from 'react';

import Converter from '../../components/Converter/Converter';
import * as constants from '../../constants/constants';

const CsvToJson = () => {
    return (
        <React.Fragment>

            <Converter link_url={constants.CSV_TO_JSON_URL} file_type="csv" page_title="Convert CSV to Json" />
            
        </React.Fragment>
    )
}

export default CsvToJson;
