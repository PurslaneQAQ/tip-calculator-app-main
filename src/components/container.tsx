import React, { useState } from 'react';
import { Form } from 'antd';

import Calculator from './calculator';
import Result from './result';
import './container.scss';

const Container:React.FC = () => {
  const [total, setTotal] = useState(0);
  const [tip, setTip] = useState(0);
  const [canReset, setCanReset] = useState(false);
  const [form] = Form.useForm();

  const computeResult = (bill: number, tipPercent:number, peopleNum:number) => {
    const tipPerPerson = bill * tipPercent / 100 / peopleNum;
    setTip(tipPerPerson);
    setTotal(tipPerPerson + bill / peopleNum);
  };

  const onValuesChange = (_:any, {
    bill, tipPercent, customTip, peopleNum,
  }:any) => {
    if (!form.isFieldsTouched(['bill', 'tipPercent', 'peopleNum'], true)) return;
    setTimeout(() => {
      const hasErrors = form.getFieldsError().reduce(
        (acc, field) => acc || Boolean(field.errors.length), false,
      );
      if (!hasErrors) {
        computeResult(bill, tipPercent === -1 ? customTip : tipPercent, peopleNum);
        setCanReset(true);
      }
    }, 200);
  };

  const onReset = () => {
    form.resetFields();
    setCanReset(false);
    setTotal(0);
    setTip(0);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      requiredMark={false}
      onValuesChange={onValuesChange}
      autoComplete="off"
    >
      <div id="containerCard">
        <div><Calculator form={form} /></div>
        <div>
          <Result canReset={canReset} onReset={onReset} total={total} tip={tip} />
        </div>
      </div>
    </Form>
  );
};

export default Container;
