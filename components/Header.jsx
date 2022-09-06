import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Layout, Menu } from 'antd';
import { useRouter, withRouter } from 'next/router';
import { useState } from 'react';

const Header = ({ selectedMenuItem }) => {
  const router = useRouter();
  const [menuItem, setMenuItem] = useState(selectedMenuItem);

  return (
    <Layout.Header style={{ background: '#fff' }}>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={[menuItem]}>
        <Menu.Item
          key="stockValuation"
          onClick={() => {
            router.push('/fairprice/calculate');
            setMenuItem('stockValuation');
          }}>
          Расчёт справедливой стоимости
        </Menu.Item>
        <SubMenu key="exports" title="Отчёты">
          <Menu.Item key="stockValuationExport" onClick={() => setMenuItem('stockValuationExport')}>
            <Link href="/fairprice/export" passHref>
              Определение стоимости ценных бумаг
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Header>
  );
};

export default withRouter(Header);
