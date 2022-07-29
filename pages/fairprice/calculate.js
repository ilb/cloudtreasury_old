import { AutoForm, AutoField, SubmitField, ErrorsField, DateField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { withRouter } from 'next/router';
import { Card } from 'antd';

const calculate = ({}) => {
    const schema = {
        type: 'object',
        properties: {
            ticker: {
                title: 'Тикер ценной бумаги',
                type: 'string',
            },
            date: {
                title: 'Дата оценки',
                type: 'object',
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

    async function onSubmit({ ticker, date }){
        console.log(date)
        const response = await fetch('/cloudtreasury/api/fairprice/calculations', 
            {method: 'POST',
                body: JSON.stringify({ ticker, date: date.toISOString().slice(0, 10) }),
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
    };

    return (
        <Card centered padded>
            <AutoForm schema={createSchemaBridge(schema)} onSubmit={onSubmit}>
                <AutoField name='ticker' />
                <DateField name='date' />
                <SubmitField value='Отправить' />
                <ErrorsField />
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
