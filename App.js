import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/deck';

const DATA = [
  { id: 1, text: '"My business, my rules."', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/ashe/hero-select-portrait.png', name: 'Elizabeth Caledonia "Calamity" Ashe' },
  { id: 2, text: '“I play to win.”', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/dva/hero-select-portrait.png', name: 'Hana Song' },
  { id: 3, text: '"Cheers, love! The cavalry is here!"', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/hero-select-portrait.png', name: 'Lena Oxton' },
  { id: 4, text: 'Александра Зарянова', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/zarya/hero-select-portrait.png', name: 'Aleksandra Zaryanova' },
  { id: 5, text: '"Everything can be hacked... and everyone."', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/sombra/hero-select-portrait.png', name: 'Olivia Colomar "Sombra"' }, 
  { id: 6, text: '"I will protect the innocent."', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/pharah/hero-select-portrait.png', name: 'Fareeha Amari' },
  { id: 7, text: '"I will be watching over you."', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/mercy/hero-select-portrait.png', name: '	Angela Ziegler' },
  { id: 8, text: '"I will prove myself!"', uri: 'https://d1u1mce87gyfbn.cloudfront.net/hero/brigitte/hero-select-portrait.png', name: 'Brigitte Lindholm' },
];

export default class App extends React.Component {
  renderCard(item) {
    return (
      <Card
        key={item.id}
        title={item.name}
        image={{ uri: item.uri }}
        imageStyle={{ height: 200, width: 110, alignSelf: 'center' }}
      >
        <Text style={{ marginBottom: 15, marginTop: 20 }}>
          {item.text}
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          title="View Now!"
        >
        </Button>
      </Card>
    )
  }

  renderNoMoreCards() {
    return (
      <Card title="Thank you for voting!">
        <Text style={{ marginBottom: 10 }}>
          There's no more candidates!
        </Text>
        <Button 
          backgroundColor="#03A9F4"
          title="Get more!"
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
