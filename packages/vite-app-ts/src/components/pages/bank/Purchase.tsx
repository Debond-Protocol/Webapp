import {Slider} from "antd";
import React, {FC} from "react";

export interface IPurchaseProps {
  selectedClass: any;
  classes: any;
}

export const Purchase: FC<IPurchaseProps> = (props) => {

  return (
    <>


              <Slider
              />


    </>
  );
}