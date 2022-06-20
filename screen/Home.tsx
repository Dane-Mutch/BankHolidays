import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Heading, ScrollView, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import {RootStackParamList} from '../App';
import {BankHolidayItem} from '../components/BankHolidayItem';
import {useAppSelector, useAppDispatch} from '../hooks';
import {selectHolidays, fetchHolidays} from '../store/holidaySlice';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = ({navigation}: HomeProps) => {
  const holidays = useAppSelector(selectHolidays);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!holidays) {
      dispatch(fetchHolidays());
    }
  }, [dispatch, holidays]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" padding={3}>
        <Heading color="blue.500">Bank holidays</Heading>

        <VStack space="md" paddingTop={2}>
          {holidays?.map(holiday => (
            <BankHolidayItem
              {...holiday}
              key={holiday.date}
              onItemButtonPress={() => navigation.navigate('Edit', holiday)}
            />
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
