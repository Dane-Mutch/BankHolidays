/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {BankHolidayResponse, Event} from './types';

const isFutureDatePredicate = (value: string) => {
  const now = new Date();
  const dateToTest = new Date(value);
  return now.getTime() <= dateToTest.getTime();
};

const getUpcomingBankHolidays = (data: BankHolidayResponse): Event[] => {
  const events = data['england-and-wales'].events;
  const futureEvents = events.filter(event => {
    return isFutureDatePredicate(event.date);
  });

  return futureEvents.slice(0, 5);
};

const App = () => {
  const [bankHolidays, setBankHolidays] = useState<Event[]>();

  useEffect(() => {
    if (!bankHolidays) {
      const fetchBankHolidays = async () => {
        try {
          const res = await fetch('https://gov.uk/bank-holidays.json');
          const json: BankHolidayResponse = await res.json();
          const upcomingBankHolidays = getUpcomingBankHolidays(json);
          setBankHolidays(upcomingBankHolidays);
        } catch (err) {
          console.log(err);
        }
      };
      fetchBankHolidays();
    }
  }, [bankHolidays]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {bankHolidays?.map(holiday => (
          <View key={holiday.date}>
            <Text>{holiday.title}</Text>
          </View>
        ))}
      </ScrollView>
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
