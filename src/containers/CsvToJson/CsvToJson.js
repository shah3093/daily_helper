import React from 'react';

import Converter from '../../components/Converter/Converter';

const CsvToJson = () => {
    return (
        <React.Fragment>

            <Converter file_type="csv" page_title="Convert CSV to Json" />
            
        </React.Fragment>
    )
}

export default CsvToJson;
