import React from 'react';
import { useQuery } from 'react-apollo';
import { format } from 'date-fns';
import Home from './Home';
import { GET_INSTALLMENTS } from './Home.query';
import { getDates } from 'src/utils';
import { dateFormat } from 'src/constants/date';

const HomeCompound = () => {
  const { startDate, endDate } = getDates(new Date());

  const { loading, error, data, fetchMore } = useQuery(GET_INSTALLMENTS, {
    variables: {
      startDate: format(startDate, dateFormat),
      endDate: format(endDate, dateFormat),
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleOnMonthChange = (startDate: string, endDate: string) => {
    fetchMore({
      variables: {
        startDate: format(startDate, dateFormat),
        endDate: format(endDate, dateFormat),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          data: [...fetchMoreResult.data],
        });
      },
    });
  };

  return <Home data={data} onMonthChange={handleOnMonthChange} />;
};

export default HomeCompound;
