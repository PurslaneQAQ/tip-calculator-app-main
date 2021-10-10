import React from 'react';
import { Button } from 'antd';
import './result.scss';

type ResultProps = {
  canReset: boolean;
  onReset(): void;
  tip?: number;
  total?: number;
};

const Result:React.FC<ResultProps> = ({
  canReset = false, onReset, tip = 0, total = 0,
}) => (
  <div id="result">
    <div>
      <div className="row-align">
        <div className="col-align">
          <div>Tip Amount </div>
          <div className="sub-label">/ person </div>
        </div>
        <div className="giant">
          $
          {tip.toFixed(2)}
        </div>
      </div>
      <div className="row-align">
        <div className="col-align">
          <div>Total </div>
          <div className="sub-label">/ person </div>
        </div>
        <div>
          <div className="giant">
            $
            {total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
    <div>
      <Button disabled={!canReset} onClick={onReset}> Reset </Button>
    </div>
  </div>
);
export default Result;
