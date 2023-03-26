import { Select } from 'antd';

function filterOption(input, option) {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

function MySearchSelect({ placeholder, value, options, handler }) {
  return (
    <Select
      showSearch
      optionFilterProp="children"
      filterOption={filterOption}
      value={value}
      placeholder={placeholder}
      options={options}
      onChange={handler}
      style={{ width: '100%' }}
    />
  );
}

export default MySearchSelect;
