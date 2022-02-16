import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Switch,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {RootStackParamList} from '../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateEntry} from '../store/holidaySlice';
import {BankHolidayWithId} from '../types';

type EditProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export const Edit = ({navigation, route}: EditProps) => {
  const [data, setData] = useState(route.params);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const onChange = (_: unknown, selectedDate: Date | undefined) => {
    const rawDate = selectedDate || data.date;
    const date = new Date(rawDate).toLocaleDateString();
    setData({...data, date});
    setShowDatePicker(false);
  };

  const handleChangeText = (title: string) => {
    setData({...data, title});
  };

  const handleNotesChange = (notes: string) => setData({...data, notes});

  const handleButtonPress = (submitData: BankHolidayWithId) => {
    console.log(submitData);
    dispatch(updateEntry(submitData));
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <VStack padding={3} space="lg">
        <Flex flexDirection="row" justifyContent="flex-start">
          <Box paddingRight={3}>
            <Text fontSize="md">Date</Text>
            <Text fontSize="md">{data.date}</Text>
          </Box>
          <Button onPress={() => setShowDatePicker(true)}>Edit</Button>
        </Flex>

        {showDatePicker && (
          <DateTimePicker value={new Date(data.date)} onChange={onChange} />
        )}
        <VStack>
          <Text fontSize="md">Bank holiday name?</Text>
          <Input
            fontSize="md"
            variant="filled"
            onChangeText={handleChangeText}
            value={data.title}
          />
        </VStack>

        <HStack space={2}>
          <Text fontSize="md">Bunting?</Text>
          <Switch
            fontSize="md"
            isChecked={data.bunting}
            onToggle={() => setData({...data, bunting: !data.bunting})}
          />
        </HStack>

        <VStack>
          <Text fontSize="md">Anything else to add?</Text>
          <TextArea
            fontSize="md"
            variant="filled"
            value={data.notes}
            onChangeText={handleNotesChange}
          />
        </VStack>

        <Button onPress={() => handleButtonPress(data)}>Submit changes</Button>
      </VStack>
    </SafeAreaView>
  );
};
