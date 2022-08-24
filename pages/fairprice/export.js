import { AutoForm, SubmitField, ErrorsField, DateField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { Card, Layout, Spin, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';

const sendOut = ({}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const schema = {
    type: 'object',
    properties: {
      date: {
        title: 'Дата генерации',
        type: 'object',
        format: 'date',
        default: new Date()
      }
    },
    required: ['date']
  };

  async function onDownload({ date }) {
    setLoading(true);
    await fetch('/cloudtreasury/api/fairprice/export', {
      method: 'GET'
    });
    setLoading(false);
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
            <Card title="Генерация отчета">
              <Spin spinning={loading}>
                <AutoForm schema={createSchemaBridge(schema)} onSubmit={onDownload}>
                  <DateField name="date" format="YYYY-MM-DD" showTime={false} />
                  <SubmitField value="Скачать" />
                  <ErrorsField />
                </AutoForm>
              </Spin>
            </Card>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default withRouter(sendOut);
