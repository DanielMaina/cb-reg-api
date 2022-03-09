import React from 'react'
// import { DeliveryReceiptContext } from 'twilio/lib/rest/conversations/v1/conversation/message/deliveryReceipt'
interface Props {
  active: boolean;
  completed: boolean;
}


const StepIcon: React.FC<Props> = ({completed}) => {
  return (
    <>
      {
        completed ?
        <div className="step-completed"></div>
        :
        <div className="step-incomplete"></div>
      }
    </>
  )
}

export default StepIcon