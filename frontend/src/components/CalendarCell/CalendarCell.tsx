import React from 'react';
import { Installment, Amount, Installments } from './CalendarCell.styled';

type Props = {
  date: any;
  installments: any;
  openModal?: any;
  openAddBillModal?: any;
};

const CalendarCell = ({ date, installments, openModal, openAddBillModal }: Props) => {
  return (
    <Installments onClick={(e) => openAddBillModal(e, date)}>
      {installments.map((installment: any, index: number) => (
        <Installment
          isPaid={installment.isPaid}
          key={index}
          onClick={(e) => openModal(e, installment.id)}
        >
          <Amount>${installment.amount.toFixed(2)}</Amount> - {installment.bill.name}
        </Installment>
      ))}
    </Installments>
  );
};

export default CalendarCell;
