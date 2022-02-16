import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Heading,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {RootStackParamList} from '../App';
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
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <VStack padding={5} space="1.5">
          <Heading color="blue.500">Bank holidays!!</Heading>

          <VStack space="md">
            {holidays?.map(holiday => (
              <VStack
                key={holiday.date}
                space="md"
                backgroundColor="blueGray.200"
                padding={3}
                borderRadius={10}>
                <View flexDir="row" justifyContent="space-between">
                  <Text fontSize="md">{holiday.title}</Text>
                  <HStack space="sm">
                    {holiday.bunting && (
                      <Box height={5} width={5}>
                        <Svg viewBox="0 0 24 24">
                          <Path
                            fill="#6F6F6F"
                            ng-attr-d="{{icon.data}}"
                            d="M12.36 6L12.76 8H18V14H14.64L14.24 12H7V6H12.36M14 4H5V21H7V14H12.6L13 16H20V6H14.4M23 18H15V20H23V18Z"
                          />
                        </Svg>
                      </Box>
                    )}
                    <Text fontSize="md">{holiday.date}</Text>
                  </HStack>
                </View>
                {!!holiday.notes && <Text fontSize="md">{holiday.notes}</Text>}
                <Button onPress={() => navigation.navigate('Edit', holiday)}>
                  Edit me!
                </Button>
              </VStack>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
