import * as React from 'react';
import { View } from 'react-native-interactable';
import { Modal as DefaultModal } from 'react-native';

import { Backdrop, Container, Slider, Header } from './styles';
import { windowHeight } from '../../utils/window';

interface Props {
  visible: boolean;
  children: any;
  onClosed: () => void;
  header?: string;
}

const Modal = ({ visible, children, onClosed, header }: Props) => {
  let intractable: any = null;
  const [isOpen, toggleOpen] = React.useState(false);
  const onDrag = (event: any) => {
    if (event.nativeEvent.targetSnapPointId === 'end') {
      setTimeout(onClosed, 200);
    }
  };

  React.useEffect(() => {
    if (visible) {
      toggleOpen(true);
      setTimeout(() => intractable && intractable.snapTo({ index: 0 }), 100);
    } else {
      setTimeout(() => intractable && intractable.snapTo({ index: 1 }), 100);
      setTimeout(() => toggleOpen(false), 300);
    }
  });

  return (
    <DefaultModal
      animationType="fade"
      transparent
      visible={isOpen}
      onRequestClose={onClosed}
    >
      <Backdrop>
        <View
          ref={instance => (intractable = instance)}
          snapPoints={[{ x: 0, y: 0 }, { x: 0, y: windowHeight, id: 'end' }]}
          initialPosition={{ x: 0, y: windowHeight }}
          style={{ flex: 1 }}
          boundaries={{ left: 0, right: 0, top: 0 }}
          onDrag={onDrag}
        >
          <Container>
            <Slider />
            {header ? <Header>{header}</Header> : null}
            {children}
          </Container>
        </View>
      </Backdrop>
    </DefaultModal>
  );
};

export default Modal;
