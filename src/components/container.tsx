import React, { useState } from 'react';
import styled from 'styled-components';

import { Form } from 'antd';

import Calculator from './calculator';
import Result from './result';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: white;
  width: 920px;
  max-width: 100vw;
  margin: 30px 0;

  @media only screen and (min-width: 720px) {
    & {
      flex-direction: row;
      margin: 80px;

      > div {
        flex-basis: 50%;
      }
    }
  }
`;

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
    setCanReset(true);
    setTimeout(() => {
      const hasErrors = form.getFieldsError().reduce(
        (acc, field) => acc || Boolean(field.errors.length), false,
      );
      if (!hasErrors)computeResult(bill, tipPercent === -1 ? customTip : tipPercent, peopleNum);
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
      <Card>
        <div><Calculator form={form} /></div>
        <div>
          <Result canReset={canReset} onReset={onReset} total={total} tip={tip} />
        </div>
      </Card>
    </Form>
  );
};

export default Container;
