import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Layout, Menu } from 'antd';
import { useRouter, withRouter } from 'next/router';

const header = ({}) => {
  const router = useRouter();

  return (
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
  );
};

export default withRouter(header);
