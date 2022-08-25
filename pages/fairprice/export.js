import { AutoForm, SubmitField, ErrorsField, DateField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { useRouter, withRouter } from 'next/router';
import { Card, Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';

const sendOut = ({}) => {
  const router = useRouter();

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
              <AutoForm
                schema={createSchemaBridge(schema)}
                onSubmit={({ currentDate }) => {
                  router.push(`/fairprice/export?date=${currentDate}`);
                }}>
                <DateField name="currentDate" format="YYYY-MM-DD" showTime={false} />
                <SubmitField value="Скачать" />
                <ErrorsField />
              </AutoForm>
            </Card>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default withRouter(sendOut);
