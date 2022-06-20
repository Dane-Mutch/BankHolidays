import {VStack, Text, View, HStack, Box, Button} from 'native-base';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

export interface BankHolidayItemProps {
  date: string;
  title: string;
  bunting: boolean;
  notes?: string;
  onItemButtonPress: () => void;
}

export const BankHolidayItem = ({
  date,
  title,
  bunting,
  notes,
  onItemButtonPress,
}: BankHolidayItemProps) => (
  <VStack
    key={date}
    space="md"
    backgroundColor="blueGray.200"
    padding={3}
    borderRadius={10}>
    <View flexDir="row" justifyContent="space-between">
      <Text fontSize="md">{title}</Text>
      <HStack space="sm">
        {bunting && (
          <Box height={5} width={5} accessibilityLabel="Bunting">
            <Svg viewBox="0 0 24 24">
              <Path
                fill="#6F6F6F"
                ng-attr-d="{{icon.data}}"
                d="M12.36 6L12.76 8H18V14H14.64L14.24 12H7V6H12.36M14 4H5V21H7V14H12.6L13 16H20V6H14.4M23 18H15V20H23V18Z"
              />
            </Svg>
          </Box>
        )}
        <Text fontSize="md">{date}</Text>
      </HStack>
    </View>
    {!!notes && <Text fontSize="md">{notes}</Text>}
    <Button onPress={onItemButtonPress}>Edit me!</Button>
  </VStack>
);
