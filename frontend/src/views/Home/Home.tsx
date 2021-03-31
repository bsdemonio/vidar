import React, { useState } from 'react';
import { isSameDay, isSameMonth, format } from 'date-fns';
// @ts-ignore
import Calendar from 'rc-big-calendar';
import CalendarCell from 'src/components/CalendarCell';
import { Container, CalendarWrapper, NavButton } from './Home.styled';
import { dateFormat } from 'src/constants/date';

type Props = {
  data: {
    installments: string[];
  };
  onMonthChange: any;
};

const Home = (props: Props) => {
  const { data, onMonthChange } = props;
  const installments = data.installments;

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const addTimeZone = (date: string) => {
    let dt = new Date(date);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt;
  };

  const getInstallmentsByDate = (installments: any, date: any) => {
    return installments.filter((installment: any) => {
      return isSameDay(addTimeZone(installment.dueDate), date);
    });
  };

  const renderDay = (date: any, startDate: any, endDate: any) => {
    return <CalendarCell installments={getInstallmentsByDate(installments, date)} date={date} />;
  };

  const getInstallments = (currentMonth: any, startDate: any, endDate: any) => {
    setCurrentMonth(currentMonth);
    onMonthChange(startDate, endDate);
  };

  const monthTotal = installments.reduce(
    (a: any, b: any) =>
      a + (b.isPaid || !isSameMonth(addTimeZone(b.dueDate), currentMonth) ? 0 : b.amount),
    0
  );

  return (
    <Container>
      <div>{monthTotal}</div>
      <CalendarWrapper>
        <Calendar
          renderDay={renderDay}
          previousButton={<NavButton className="icon">chevron_left</NavButton>}
          nextButton={<NavButton className="icon">chevron_right</NavButton>}
          onMonthChange={getInstallments}
          mobileBreakpoint={900}
        />
      </CalendarWrapper>
    </Container>
  );
};

export default Home;
