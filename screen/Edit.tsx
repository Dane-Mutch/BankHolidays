import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Flex,
  FormControl,
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
import {updateHolidayEntry} from '../store/holidaySlice';
import {BankHolidayWithId} from '../types';

type EditProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export const Edit = ({navigation, route}: EditProps) => {
  const [holiday, setHoliday] = useState(route.params);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const onChange = (_: unknown, selectedDate: Date | undefined) => {
    const rawDate = selectedDate || holiday.date;
    const date = new Date(rawDate).toLocaleDateString();
    setShowDatePicker(false);
    setHoliday({...holiday, date});
  };

  const handleChangeText = (title: string) => {
    setHoliday({...holiday, title});
  };

  const handleNotesChange = (notes: string) => setHoliday({...holiday, notes});

  const handleSubmitPress = (updatedHoliday: BankHolidayWithId) => {
    dispatch(updateHolidayEntry(updatedHoliday));
    navigation.navigate('Home');
  };

  const handleEditDatePress = () => setShowDatePicker(true);

  const handleBuntingToggle = () =>
    setHoliday({...holiday, bunting: !holiday.bunting});

  return (
    <SafeAreaView>
      <VStack padding={3} space="lg">
        <Box>
          <Text fontSize="lg">Date</Text>
          <Text fontSize="lg">{holiday.date}</Text>
        </Box>
        <Button flexGrow={1} onPress={handleEditDatePress}>
          Edit Date
        </Button>

        {showDatePicker && (
          <DateTimePicker value={new Date(holiday.date)} onChange={onChange} />
        )}
        <VStack>
          <FormControl>
            <FormControl.Label fontSize="lg">
              Bank holiday name
            </FormControl.Label>
            <Input
              fontSize="md"
              variant="filled"
              onChangeText={handleChangeText}
              value={holiday.title}
            />
          </FormControl>
        </VStack>

        <HStack space={2}>
          <Text fontSize="lg">Bunting</Text>
          <Switch isChecked={holiday.bunting} onToggle={handleBuntingToggle} />
        </HStack>

        <VStack>
          <FormControl>
            <FormControl.Label>
              <Text fontSize="md">Notes</Text>
            </FormControl.Label>
            <TextArea
              variant="filled"
              value={holiday.notes}
              onChangeText={handleNotesChange}
            />
          </FormControl>
        </VStack>

        <Button onPress={() => handleSubmitPress(holiday)}>
          Submit changes
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
