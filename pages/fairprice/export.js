import { AutoForm, SubmitField, ErrorsField, DateField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { useRouter, withRouter } from 'next/router';
import { Card, Layout } from 'antd';
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
    required: ['date']
  };

  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <Layout.Content>
            <Card title="Генерация отчета">
              <AutoForm
                schema={createSchemaBridge(schema)}
                onSubmit={({ currentDate }) => {
                  router.push(`/api/fairprice/export?date=${currentDate.toISOString()}`);
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
