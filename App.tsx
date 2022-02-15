/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useAsync} from './hooks/useAsync';
import {BankHolidayResponse} from './types';

const isFutureDatePredicate = (value: string) => {
  const now = new Date();
  const dateToTest = new Date(value);
  return now.getTime() <= dateToTest.getTime();
};

const filterBankHolidayData = (data: BankHolidayResponse): Event[] => {
  const events = data['england-and-wales'].events;
  const futureEvents = events.filter(event => {
    return isFutureDatePredicate(event.date);
  });

  return futureEvents.slice(0, 5);
};

const App = () => {
  const [bankHolidays, setBankHolidays] = useState<Event | null>(null);

  const fetchBankHolidays = useCallback(async () => {
    try {
      const res = await fetch('https://gov.uk/bank-holidays.json');
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const {status, value, error} = useAsync<void>(
    fetchBankHolidays,
    true,
    filterBankHolidayData,
  );

  console.log(value);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
