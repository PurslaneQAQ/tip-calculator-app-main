import React from 'react';
import {
  Form, Input, Radio, FormInstance,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './calculator.scss';

type CalculatorProps = {
  form: FormInstance;
};

const normalizeFloat = (value:string, prevValue:string) => {
  if (/^\d+(\.\d{1,2})?$/.test(value)) { return value; }
  return prevValue;
};

const normalizeInteger = (value:string, prevValue:string) => {
  if (/^\d*$/.test(value)) { return value; }
  return prevValue;
};

const Calculator:React.FC<CalculatorProps> = ({ form }) => (
  <div id="calculator">
    <Form.Item
      label="Bill"
      name="bill"
      normalize={normalizeFloat}
      rules={[{ required: true, message: '' }]}
    >
      <Input
        prefix="$"
        placeholder="0"
        type="number"
      />
    </Form.Item>
    <Form.Item
      label="Select Tip %"
      name="tipPercent"
      rules={[{ required: true, message: '' }]}
    >
      <Radio.Group>
        <Radio.Button value={5}> 5% </Radio.Button>
        <Radio.Button value={10}> 10% </Radio.Button>
        <Radio.Button value={15}> 15% </Radio.Button>
        <Radio.Button value={25}> 25% </Radio.Button>
        <Radio.Button value={50}> 50% </Radio.Button>
        <Radio.Button value={-1} className="custom-tip">
          <Form.Item
            name="customTip"
            normalize={normalizeInteger}
            rules={[
              {
                validator: (_, value) => (
                  form.getFieldValue('tipPercent') !== -1 || value >= 0
                    ? Promise.resolve()
                    : Promise.reject()
                ),
              }]}
          >
            <Input
              placeholder="Custom"
              onClick={
              () => {
                form.setFieldsValue({ tipPercent: -1 });
              }
            }
            />
          </Form.Item>
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      label="People"
      name="peopleNum"
      normalize={normalizeInteger}
      rules={[
        { required: true, message: '' },
        {
          validator: (_, value) => (
            Number(value) > 0
              ? Promise.resolve()
              : Promise.reject(new Error('Can\'t be zero!'))
          ),
        },
      ]}
    >
      <Input prefix={<UserOutlined style={{ fontSize: '16px' }} />} placeholder="0" type="number" min="0" step="1" />
    </Form.Item>
  </div>
);

export default Calculator;
