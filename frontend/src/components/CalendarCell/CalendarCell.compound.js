import React from "react";
import { compose, graphql } from "react-apollo";
import { OPEN_MODAL_MUTATION } from "src/components/Modal/Modal.query";
import CalendarCell from "./CalendarCell";

const CalendarCellCompound = props => {
  const {
    date,
    installments,
    startDate,
    endDate,
    openModalMutation,
    openAddBillModalMutation
  } = props;

  const handleOpenModal = (e, installmentId) => {
    openModalMutation({
      variables: {
        type: "EDIT_INSTALLMENT",
        id: installmentId,
        jsonData: `{"startDate": "${startDate}", "endDate": "${endDate}"}`
      }
    });
    e.stopPropagation();
  };

  const handleOpenAddBillModal = (e, date) => {
    openAddBillModalMutation({
      variables: {
        type: "CREATE_BILL",
        id: date.toString(),
        jsonData: `{"startDate": "${startDate}", "endDate": "${endDate}"}`
      }
    });
    e.stopPropagation();
  };

  return (
    <CalendarCell
      date={date}
      installments={installments}
      openModal={handleOpenModal}
      openAddBillModal={handleOpenAddBillModal}
    />
  );
};

export default compose(
  graphql(OPEN_MODAL_MUTATION, {
    name: "openModalMutation"
  }),
  graphql(OPEN_MODAL_MUTATION, {
    name: "openAddBillModalMutation"
  })
)(CalendarCellCompound);
