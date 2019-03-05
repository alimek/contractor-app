import styled from '../../utils/styled-components';

import { Card as DefaultCard, DefaultText } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';

export const Container = styled(ScrollView)`
  flex: 1;
  padding: 10px;
`;

export const DaySummaryContainer = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 20px;
  justify-content: center;

`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
`;

export const Label = styled(DefaultText)`
  font-weight: bold;
  font-size: 15px;
`;
export const Value = styled(DefaultText)`
  font-size: 15px;
  flex: 1;
  text-align: right;
  margin-right: 20px;
`;

export const Card = styled(DefaultCard)`
  max-height: 250px;
`;

export const CardRow = styled(Card)`
  flex-direction: row;
`;

export const TimeContainer = styled.View`
  background-color: ${props => props.theme.primaryColor};
  border-radius: 5px;
  padding: 5px 10px;
`;

export const TimeText = styled(DefaultText)`
  text-align: center;
  color: white;
`;

export const Placeholder = styled(DefaultText)`
  font-size: 14px;
  text-align: center;
`;
