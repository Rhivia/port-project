import React from 'react';
import { 
  View, 
  Animated, 
  PanResponder, 
  Dimensions 
} from 'react-native';

export default function resetPosition() {
  Animated.spring(this.state.position, {
    toValue: { x: 0, y: 0 }
  }).start();
}