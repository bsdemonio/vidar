import React, {FC, useState} from 'react';

import {FormikErrors} from 'formik';
import {Text, View} from 'react-native';

import DatePicker from '../../components/DatePicker';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Picker from '../../components/Picker';
import {PickerData} from '../../components/Picker/Picker';

import {FormValues} from './CreateBill.compound';
import styles from './CreateBill.styles';

type Props = {
  loading: boolean;
  values: FormValues;
  errors: FormikErrors<FormValues>;
  setFieldValue: (field: string, value: any) => void;
};

type Pickers = {
  date: boolean;
  frequency: boolean;
  every: boolean;
  installments: boolean;
};

// TODO improve this type
type FrequencyMap = {[key: string]: string};

export const frequencyMap: FrequencyMap = {
  d: 'day',
  w: 'week',
  M: 'month',
  y: 'year',
};

// TODO remove array, use simple for loop
const installmentPickerValues: PickerData = {};
Array.from(Array(100).keys())
  .slice(1)
  .forEach((i) => (installmentPickerValues[i] = i.toString()));

const everyPickerValues: PickerData = {};
Array.from(Array(1000).keys())
  .slice(1)
  .forEach((i) => (everyPickerValues[i] = i.toString()));

const frequencyPickerValues: PickerData = {
  d: 'Daily',
  w: 'Weekly',
  M: 'Monthly',
  y: 'Yearly',
};

const CreateBill: FC<Props> = ({values, setFieldValue, loading}) => {
  const [visiblePickers, setVisiblePickers] = useState<Pickers>({
    date: false,
    frequency: false,
    every: false,
    installments: false,
  });
  const showPicker = (name: keyof Pickers) => {
    setVisiblePickers((prevState) => ({
      frequency: false,
      every: false,
      date: false,
      installments: false,
      [name]: !prevState[name],
    }));
  };

  const installments = parseInt(values.installments, 10);
  const amount = parseFloat(values.amount);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.formSection}>
        <Input
          value={values.name}
          onChangeText={(value) => setFieldValue('name', value)}
          placeholder="Bill Name"
        />
        <Input
          value={values.amount}
          onChangeText={(value) => setFieldValue('amount', value)}
          placeholder={installments > 1 ? 'Installment Amount' : 'Amount'}
          borderless
          keyboardType="numeric"
        />
      </View>
      {!isNaN(amount) && installments > 1 && (
        <Text style={styles.legend}>
          This will create {values.installments} installments of {amount} each
          one.
        </Text>
      )}
      <View style={styles.formSection}>
        <DatePicker
          name="datePicker"
          value={values.date}
          onChangeText={(_, date) => setFieldValue('date', date)}
          borderless
          placeholder="Date"
          onPress={() => showPicker('date')}
          open={visiblePickers.date}
        />
      </View>
      <View style={styles.formSection}>
        <Picker
          name="installmentsPicker"
          placeholder="Installments"
          onChangeText={(value) => setFieldValue('installments', value)}
          value={values.installments}
          onPress={() => showPicker('installments')}
          open={visiblePickers.installments}
          data={installmentPickerValues}
          borderless={installments === 1}
        />
        {installments > 1 && (
          <>
            <Picker
              name="frequencyPicker"
              placeholder="Frequency"
              onChangeText={(value) => {
                setFieldValue('recurrenceSpan', value);
              }}
              value={values.recurrenceSpan}
              onPress={() => showPicker('frequency')}
              data={frequencyPickerValues}
              open={visiblePickers.frequency}
            />
            <Picker
              name="everyPicker"
              placeholder="Every"
              onChangeText={(value) => setFieldValue('recurrenceNumber', value)}
              value={values.recurrenceNumber}
              onPress={() => showPicker('every')}
              borderless
              open={visiblePickers.every}
              data={everyPickerValues}
              extraText={`${frequencyMap[values.recurrenceSpan]}${
                parseInt(values.recurrenceNumber, 10) > 1 ? 's' : ''
              }`}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default CreateBill;
