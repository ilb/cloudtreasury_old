import { Button, Card, Col, Layout, message, Modal, Row, Space } from 'antd';
import { useMemo, useState } from 'react';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { AutoField, AutoForm, SubmitField } from 'uniforms-antd';
import MySearchSelect from '../components/MySearchSelect';
import { useRouter } from 'next/router';
// import awilix from 'awilix';

const admin = (props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(false);
  const [value, setValue] = useState('');
  const initialCurrentStock = {
    stock_id: null,
    ticker: null,
    value: null,
    isin: null
  };

  const [currentStock, setCurrentStock] = useState(initialCurrentStock);

  const resultSchema = {
    type: 'object',
    properties: {
      ticker: {
        title: 'Наименование',
        type: 'string'
      },
      value: {
        title: 'Объём выпуска',
        type: 'integer'
      },
      isin: {
        title: 'ISIN',
        type: 'string'
      }
    }
  };

  const fetchUrl = async (url, method = 'GET', body = {}) => {
    let options = {};
    if (method == 'POST') {
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };
    }
    const resp = await fetch(url, options);
    return resp.json();
  };

  const findStockById = (id) => {
    return props.stockList.find((el) => el.stock_id == id);
  };

  const optionsGenerate = () => {
    if (props.stockList.length) {
      return props.stockList.map((stock) => {
        return {
          label: stock.ticker,
          value: stock.stock_id
        };
      });
    }
  };
  const options = useMemo(() => optionsGenerate(), [props.stockList]);

  const InputHandler = (value) => {
    setShowTicker(false);
    setValue(value);
    setCurrentStock(findStockById(value));
  };

  const sendForm = async (formData) => {
    console.log(currentStock);
    if (currentStock.stock_id) {
      try {
        const result = await fetchUrl(
          `/cloudtreasury/api/admin/updateStock/${currentStock.stock_id}`,
          'POST',
          formData
        );
        message.info(result.message);
        router.replace(router.asPath);
      } catch (e) {
        message.error(e.message);
      }
    } else {
      try {
        const result = await fetchUrl('/cloudtreasury/api/admin/createStock', 'POST', formData);
        message.info(result.message);
        router.replace(router.asPath);
      } catch (e) {
        message.error(e.message);
      }
    }
    setValue('');
    setCurrentStock(initialCurrentStock);
  };

  const showModal = () => {
    if (currentStock.value) {
      setIsModalOpen(true);
    } else {
      message.error('Вы не выбрали запись');
    }
  };
  const handleOkModal = async () => {
    try {
      const result = await fetchUrl(
        `/cloudtreasury/api/admin/deleteStock/${currentStock.stock_id}`
      );
      message.info(result.message);
      router.replace(router.asPath);
    } catch (e) {
      message.error(e.message);
    }
    setValue('');
    setCurrentStock(initialCurrentStock);
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const addButtonHandler = () => {
    setCurrentStock(initialCurrentStock);
    setValue('');
    setShowTicker(true);
  };

  return (
    <Layout>
      <Layout.Content>
        <Modal
          title="Подтверждение удаления"
          open={isModalOpen}
          onOk={handleOkModal}
          onCancel={handleCancelModal}>
          <p>Вы уверены, что хотите удалит запись: {currentStock.ticker}?</p>
        </Modal>
        <Row
          gutter={16}
          type="flex"
          justify="center"
          style={{ minHeight: '100vh', padding: '15px 0px 0px 0px' }}>
          <Col span={8}>
            <Card title="Выбор ценной бумаги">
              <MySearchSelect
                placeholder="Выберите stock"
                value={value}
                options={options}
                handler={InputHandler}
              />
              <Space size={8} style={{ marginTop: '15px' }}>
                <Button type="primary" onClick={addButtonHandler}>
                  Добавить
                </Button>
                <Button type="primary" onClick={showModal}>
                  Удалить
                </Button>
              </Space>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Данные ценной бумаги">
              <AutoForm schema={createSchemaBridge(resultSchema)} onSubmit={sendForm}>
                {showTicker && (
                  <AutoField
                    name="ticker"
                    value={currentStock.ticker}
                    onInput={(e) => setCurrentStock({ ...currentStock, ticker: e.target.value })}
                  />
                )}
                <AutoField
                  value={currentStock.value}
                  onInput={(value) => setCurrentStock({ ...currentStock, value: value })} // Здесь возразщает сразу e.target.value, вместо event`a
                  name="value"
                />
                <AutoField
                  value={currentStock.isin}
                  onInput={(e) => setCurrentStock({ ...currentStock, isin: e.target.value })}
                  name="isin"
                />
                <SubmitField value="Сохранить" />
              </AutoForm>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/cloudtreasury/api/admin/getStocks');
  const data = await res.json();

  return { props: { stockList: data.data } };
}

export default admin;
