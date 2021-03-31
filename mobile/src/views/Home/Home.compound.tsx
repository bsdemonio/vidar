import React, {FC, useLayoutEffect} from 'react';

import {useMutation, useQuery} from '@apollo/client';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format} from 'date-fns';
import {Button} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import {
  deleteBillFromLocalStore,
  updateInstallmentFromLocalStore,
} from '../../ApolloStore';
import Error from '../../components/Error';
import {
  HomeNonModalStackParamList,
  HomeStackParamList,
  Installment,
} from '../../types';
import {
  PayInstallmentMutationData,
  PayInstallmentMutationVars,
} from '../InstallmentDetails/InstallmentDetails.compound';
import {PAY_INSTALLMENT} from '../InstallmentDetails/InstallmentDetails.query';

import Home from './Home';
import {DELETE_BILL, GET_INSTALLMENTS} from './Home.query';

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  StackNavigationProp<HomeNonModalStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export type InstallmentsQueryData = {
  installments: Installment[];
};

type InstallmentsQueryVars = {
  paid: boolean;
};

export type DeleteBillMutationData = {
  deleteBill: {
    id: string;
  };
};

export type DeleteBillMutationVars = {
  id: string;
};

type SwipeListItem = {
  key: string;
} & Installment;

type Section = {
  title: string;
  data: SwipeListItem[];
};

//TODO move this to the backend (or not)
const createSections = (installments?: Installment[]) => {
  if (!installments) {
    return;
  }
  return installments.reduce((groups: Section[], item) => {
    const dueDate = format(new Date(item.dueDate), 'MMMM yyyy');
    const index = groups.findIndex((group) => group.title === dueDate);
    if (index === -1) {
      groups.push({
        title: dueDate,
        data: [{key: item.id, ...item}],
      });
    } else {
      groups[index].data.push({key: item.id, ...item});
    }
    return groups;
  }, []);
};

const HomeCompound: FC<Props> = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery<
    InstallmentsQueryData,
    InstallmentsQueryVars
  >(GET_INSTALLMENTS, {
    variables: {
      paid: false,
    },
  });

  const [deleteBill, {loading: deleteLoading}] = useMutation<
    DeleteBillMutationData,
    DeleteBillMutationVars
  >(DELETE_BILL, {
    onError: (e) => {
      console.error(JSON.stringify(e, null, 4));
      showMessage({
        message:
          'There was an error while deleting the bill, please try it again.',
        type: 'danger',
        duration: 5000,
        icon: 'danger',
      });
    },
  });

  const [payInstallment, {loading: payLoading}] = useMutation<
    PayInstallmentMutationData,
    PayInstallmentMutationVars
  >(PAY_INSTALLMENT, {
    onError: (e) => {
      console.error(JSON.stringify(e, null, 4));
      showMessage({
        message:
          'There was an error while paying the installment, please try it again.',
        type: 'danger',
        duration: 5000,
        icon: 'danger',
      });
    },
  });

  const handleListItemPress = (installment: Installment) => {
    navigation.navigate('Details', {
      installment,
    });
  };

  const handleDeleteItem = (id: string) => {
    deleteBill({
      variables: {id},
      update: (store, {data: deleteBillData}) => {
        deleteBillFromLocalStore(store, deleteBillData);
      },
    });
  };

  const handlePayInstallment = (id: string) => {
    payInstallment({
      variables: {id},
      update: (store, {data: payInstallmentData}) => {
        updateInstallmentFromLocalStore(store, payInstallmentData);
      },
    });
  };

  const handleRetry = () => {
    refetch();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={deleteLoading}
          onPress={() => navigation.navigate('CreateBill')}
          title="Add"
        />
      ),
      headerTitleAlign: 'left',
    });
  }, [navigation, deleteLoading]);

  if (error) {
    return <Error action={handleRetry} />;
  }

  return (
    <Home
      loading={loading || deleteLoading || payLoading}
      sections={createSections(data?.installments)}
      onListItemPress={handleListItemPress}
      onDelete={handleDeleteItem}
      onPay={handlePayInstallment}
    />
  );
};

export default HomeCompound;
