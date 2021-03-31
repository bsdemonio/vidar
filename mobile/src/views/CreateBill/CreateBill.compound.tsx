import React, {FC, useLayoutEffect} from 'react';

import {useMutation} from '@apollo/client';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format} from 'date-fns';
import {useFormik} from 'formik';
import {Button} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import * as yup from 'yup';

import {addBillToLocalStore} from '../../ApolloStore';
import {
  HomeNonModalStackParamList,
  HomeStackParamList,
  Installment,
} from '../../types';

import CreateBill from './CreateBill';
import {CREATE_BILL} from './CreateBill.query';

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  StackNavigationProp<HomeNonModalStackParamList>
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export type FormValues = {
  name: string;
  amount: string;
  installments: string;
  recurrenceNumber: string;
  recurrenceSpan: string;
  date: string;
};

export type CreateBillMutationData = {
  createBill: {
    installments: Installment[];
  };
};

type CreateBillMutationVars = {
  name: string;
  amount: number;
  installments: number;
  recurrenceNumber: number;
  recurrenceSpan: string;
  date: string;
};

const formValidationSchema = yup.object().shape({
  name: yup.string().required(),
  amount: yup.number().required().positive(),
  installments: yup.number().required().positive().integer(),
  recurrenceNumber: yup.number().required().positive().integer().default(1),
  recurrenceSpan: yup.string(),
  date: yup
    .date()
    .required()
    .default(function () {
      return new Date();
    }),
});

const CreateBillCompound: FC<Props> = ({navigation}) => {
  const [createBill, {loading}] = useMutation<
    CreateBillMutationData,
    CreateBillMutationVars
  >(CREATE_BILL, {
    onCompleted: () => {
      formik.setSubmitting(false);
      showMessage({
        message: 'Bill added correctly.',
        type: 'success',
        duration: 5000,
        icon: 'success',
      });
      navigation.goBack();
    },
    onError: (e) => {
      formik.setSubmitting(false);
      console.error(JSON.stringify(e, null, 4));
      showMessage({
        message:
          'There was an error while creating the bill, please try it again.',
        type: 'danger',
        duration: 5000,
        icon: 'danger',
      });
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      amount: '',
      installments: '1',
      recurrenceSpan: 'M',
      recurrenceNumber: '1',
      date: format(new Date(), 'yyyy/MM/dd'),
    },
    validationSchema: formValidationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      createBill({
        variables: {
          name: values.name,
          amount: parseFloat(values.amount),
          installments: parseInt(values.installments, 10),
          recurrenceNumber: parseInt(values.recurrenceNumber, 10),
          recurrenceSpan: values.recurrenceSpan,
          date: values.date,
        },
        update: (store, {data}) => {
          addBillToLocalStore(store, data);
        },
      });
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={!formik.isValid || formik.isSubmitting || loading}
          onPress={formik.handleSubmit}
          title="Add"
        />
      ),
      headerLeft: () => (
        <Button
          disabled={formik.isSubmitting || loading}
          onPress={() => navigation.goBack()}
          title="Cancel"
        />
      ),
    });
  }, [
    navigation,
    formik.isValid,
    formik.handleSubmit,
    formik.isSubmitting,
    loading,
  ]);

  return (
    <CreateBill
      loading={loading}
      values={formik.values}
      errors={formik.errors}
      setFieldValue={formik.setFieldValue}
    />
  );
};

export default CreateBillCompound;
