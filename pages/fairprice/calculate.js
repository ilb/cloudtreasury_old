import { AutoForm, AutoField, SubmitField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
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
            },
            receivedDate: {
                title: 'Дата оценки',
                type: 'string',
                format: 'date'
            },
            active: {
                title: 'Активный рынок',
                type: 'string'
            },
            fairPrice: {
                title: 'Справедливая стоимость ценной бумаги',
                type: 'string'
            },
            countDays: {
                title: 'Количество дней, в которые заключались сделки',
                type: 'string'
            },
            countDeals: {
                title: 'Количество совершенных сделок',
                type: 'string'
            },
            initialVolume: {
                title: 'Объем выпуска',
                type: 'string'
            },
            tradingVolume: {
                title: 'Суммарный объем торгов по ценной бумаге',
                type: 'string'
            }
        },
        required: ['ticker', 'date']
    };

    async function onSubmit(data){
        console.log(data)
        const response = await fetch('/api/fairprice/calculations', 
            {method: 'POST',
                body: JSON.stringify(data), 
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
    };

    return (
        <Card centered padded>
            <AutoForm schema={createSchemaBridge(schema)} submitField={SubmitField} onSubmit={onSubmit}>
                <AutoField name='ticker' />
                <DatePicker name='date' />
                <SubmitField value='Отправить' />
                <br />
                <AutoField name='receivedDate' readOnly />
                <AutoField name='active' readOnly />
                <AutoField name='fairPrice' readOnly />
                <AutoField name='countDays' readOnly />
                <AutoField name='countDeals' readOnly />
                <AutoField name='initialVolume' readOnly />
                <AutoField name='tradingVolume' readOnly />
            </AutoForm>
        </Card>
    );
};

export default withRouter(calculate);