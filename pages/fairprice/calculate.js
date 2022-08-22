import { AutoForm, AutoField, SubmitField, ErrorsField, DateField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { useRouter, withRouter } from 'next/router';
import { Card, Col, Input, Layout, Menu, message, Row, Skeleton, Spin } from 'antd';
import { useState } from 'react';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';

const calculate = ({}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [calculateResult, setCalculateResult] = useState({});

  const schema = {
    type: 'object',
    properties: {
      ticker: {
        title: 'Тикер ценной бумаги',
        type: 'string'
      },
      date: {
        title: 'Дата оценки',
        type: 'object',
        format: 'date',
        default: new Date()
      }
    },

    required: ['ticker', 'date']
  };

  const resultSchema = {
    type: 'object',
    properties: {
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
    }
  };

  async function onSubmit({ ticker, date }) {
    setLoading(true);
    const response = await fetch('/cloudtreasury/api/fairprice/calculations', {
      method: 'POST',
      body: JSON.stringify({ ticker, date: date.toISOString().slice(0, 10) }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setLoading(false);

    if (!response.ok) {
      message.error(
        'Что-то пошло не так. Проверьте введенный тикер, возможно по нему отсутствуют данные'
      );
      return;
    }

    const json = await response.json();
    setCalculateResult({ ...json, active: json.active === true ? 'Да' : 'Нет' });
  }

  return (
    <>
      <Layout>
        <Layout.Header style={{ background: '#fff' }}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['stockValuation']}>
            <Menu.Item key="stockValuation" onClick={() => router.push('/fairprice/calculate')}>
              Расчёт справедливой стоимости
            </Menu.Item>
            <SubMenu key="exports" title="Отчёты">
              <Menu.Item key="stockValuationExport">
                <Link href="/api/fairprice/export" passHref>
                  Определение стоимости ценных бумаг
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Layout.Header>
        <Layout>
          <Layout.Content>
            <Row
              gutter={16}
              type="flex"
              justify="center"
              style={{ minHeight: '100vh', padding: '15px 0px 0px 0px' }}>
              <Col span={8}>
                <Card title="Тикер">
                  <AutoForm schema={createSchemaBridge(schema)} onSubmit={onSubmit}>
                    <AutoField name="ticker" />
                    <DateField name="date" format="YYYY-MM-DD" showTime={false} />
                    <SubmitField value="Отправить" />
                    <ErrorsField />
                  </AutoForm>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Результаты расчёта">
                  <AutoForm schema={createSchemaBridge(resultSchema)} readOnly>
                    <Spin spinning={loading}>
                      <AutoField name="receivedDate" value={calculateResult.date} />
                      <AutoField name="active" readOnly value={calculateResult.active} />
                      <AutoField name="fairPrice" readOnly value={calculateResult.fairPrice} />
                      <AutoField name="countDays" readOnly value={calculateResult.countDays} />
                      <AutoField name="countDeals" readOnly value={calculateResult.countDeals} />
                      <AutoField
                        name="initialVolume"
                        readOnly
                        value={calculateResult.initialVolume}
                      />
                      <AutoField
                        name="tradingVolume"
                        readOnly
                        value={calculateResult.tradingVolume}
                      />
                    </Spin>
                  </AutoForm>
                </Card>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default withRouter(calculate);
