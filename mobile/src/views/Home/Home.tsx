import React, {FC, useCallback} from 'react';

import {View, ListRenderItemInfo, SectionListData} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import InstallmentCard from '../../components/InstallmentCard';
import ListAction from '../../components/ListActions';
import ListHeader from '../../components/ListHeader';
import Loading from '../../components/Loading';
import {Installment} from '../../types';

import styles from './Home.styles';

type Section = {
  title: string;
  data: Installment[];
};

type Props = {
  sections?: Section[];
  onListItemPress: (item: Installment) => void;
  onDelete: (id: string) => void;
  onPay: (id: string) => void;
  loading: boolean;
};

const Home: FC<Props> = ({
  loading,
  sections,
  onListItemPress,
  onDelete,
  onPay,
}) => {
  const listHeader = useCallback(
    ({section}: {section: SectionListData<Installment>}) => (
      <ListHeader header={section.title} />
    ),
    [],
  );
  const listItem = useCallback(
    ({item}: {item: Installment}) => (
      <InstallmentCard
        installment={item}
        onPress={() => onListItemPress(item)}
      />
    ),
    [onListItemPress],
  );
  const listActions = useCallback(
    (data: ListRenderItemInfo<Installment>) => (
      <ListAction data={data} onDelete={onDelete} onPay={onPay} />
    ),
    [onDelete, onPay],
  );
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      {sections && (
        <SwipeListView
          useSectionList
          sections={sections}
          renderItem={listItem}
          renderSectionHeader={listHeader}
          renderHiddenItem={listActions}
          closeOnScroll
          closeOnRowOpen
          closeOnRowPress
          disableRightSwipe
          leftOpenValue={0}
          rightOpenValue={-150}
          swipeToOpenPercent={20}
        />
      )}
    </View>
  );
};
export default Home;
