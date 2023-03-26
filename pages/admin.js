import { Button, Card, Col, Layout, message, Modal, Row, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { AutoField, AutoForm, SubmitField } from 'uniforms-antd';
import MySearchSelect from '../components/MySearchSelect';
// import awilix from 'awilix';

const admin = () => {
  const [stocksList, setStocksList] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    setLoading(false);
    return resp.json();
  };

  const findStockById = (id) => {
    return stocksList.find((el) => el.stock_id == id);
  };

  const optionsGenerate = () => {
    if (stocksList.length) {
      const options = stocksList.map((stock) => {
        return {
          label: stock.ticker,
          value: stock.stock_id
        };
      });
      return options;
    }
  };

  const fetch_and_write_stocks = () => {
    fetchUrl('/cloudtreasury/api/admin/getStocks').then((result) => setStocksList(result.data));
  };

  useEffect(() => {
    fetch_and_write_stocks();
  }, []);

  const options = useMemo(() => optionsGenerate(), [stocksList]);

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
        await fetch_and_write_stocks();
        message.info(result.message);
      } catch (e) {
        message.error(e.message);
      }
    } else {
      try {
        const result = await fetchUrl('/cloudtreasury/api/admin/createStock', 'POST', formData);
        await fetch_and_write_stocks();
        message.info(result.message);
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
      await fetch_and_write_stocks();
      message.info(result.message);
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
            <Card title="Выбор Stock`a">
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
            <Card title="Данные по Stock">
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

export default admin;
