import { AutoForm, SubmitField, ErrorsField, DateField } from 'uniforms-antd';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { useRouter, withRouter } from 'next/router';
import { Card, Layout } from 'antd';
import header from './header/header';

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
        {header()}
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
