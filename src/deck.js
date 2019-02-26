import React from 'react';
import { 
  View, 
  Animated, 
  PanResponder, 
  Dimensions,
  StyleSheet
} from 'react-native';
// import resetPosition from './helpers';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_ROTATION = SCREEN_WIDTH * 1.8;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_DURATION = 500;

export default class Deck extends React.Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (e, gesture) => {
        position.setValue({ x: gesture.dx, y: 0}); //gesture.dy
      },

      onPanResponderRelease: (e, gesture) => {
        if( gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if ( gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_ROTATION : -SCREEN_ROTATION;
    Animated.timing(this.state.position, {
      toValue: { x , y: 0 },
      duration: SWIPE_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_ROTATION, 0, SCREEN_ROTATION],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    if ( this.state.index >= this.props.data.length ) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, i) => {
      if(i < this.state.index) { return null; }

      if(i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: i * -1 }]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <View key={item.id} style={[{ zIndex: i * -1 }, styles.cardStyle]}>
          { this.props.renderCard(item) }
        </View>
      )
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    // left: 0,
    // right: 0,
    width: SCREEN_WIDTH
  },
});
