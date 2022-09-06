import { AutoForm, SubmitField, ErrorsField, DateField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { useRouter, withRouter } from 'next/router';
import { Card, Col, Layout, Row } from 'antd';
import Header from '../../components/Header';

const sendOut = () => {
  const router = useRouter();

  const schema = {
    type: 'object',
    properties: {
      currentDate: {
        title: 'Дата генерации',
        type: 'object',
        format: 'date',
        default: new Date()
      }
    },
    required: ['currentDate']
  };

  return (
    <>
      <Layout>
        <Header selectedMenuItem="exports" />
        <Layout>
          <Layout.Content>
            <Row
              gutter={16}
              type="flex"
              justify="center"
              style={{ minHeight: '100vh', padding: '15px 0px 0px 0px' }}>
              <Col span={8}>
                <Card title="Генерация отчета">
                  <AutoForm
                    schema={createSchemaBridge(schema)}
                    onSubmit={({ currentDate }) => {
                      router.push(
                        `/api/fairprice/export?currentDate=${currentDate
                          .toISOString()
                          .slice(0, 10)}`
                      );
                    }}>
                    <DateField name="currentDate" format="YYYY-MM-DD" showTime={false} />
                    <SubmitField value="Скачать" />
                    <ErrorsField />
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

export default withRouter(sendOut);
