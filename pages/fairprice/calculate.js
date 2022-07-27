import { AutoForm, AutoField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { SubmitField } from 'uniforms-antd';
import { withRouter } from 'next/router';
import { Card, DatePicker } from 'antd';

const calculate = ({}) => {
    const schema = {
        type: 'object',
        properties: {
            ticker: {
                title: 'Тикер ценной бумаги',
                type: 'string',
                normalizeSpace: true
            },
            date: {
                title: 'Дата оценки',
                type: 'string',
                format:  'date'
            }
        },
        required: ['ticker', 'date']
    };

    async function onSubmit(data){
        const response = await fetch('/api/fairprice/calculations', 
            {method: 'POST',
                body: JSON.stringify(data), 
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        const json = await response.json();
    };

    return (
        <Card centered padded>
            <AutoForm schema={createSchemaBridge(schema)}>
            <AutoField name='ticker' />
            <DatePicker name='date' />
            <SubmitField value='Отправить' onSubmit={onSubmit}/>
            </AutoForm>
        </Card>
    );
};

export default withRouter(calculate);