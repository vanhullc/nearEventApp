import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, Button, Modal, TouchableHighlight, TextInput, TouchableCustom, Picker } from 'react-native'
import { Images } from '../Themes'
import { FullButton } from '../Components/FullButton'
import { showLocation } from 'react-native-map-link'
import { LinearGradient } from 'expo';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

// Styles
import styles from './Styles/LaunchScreenStyles'

const extractKey = ({item}) => item.key.toString()

const test = [{
  id: 0,
  title: 'Basic Components',
  data: [
    {id: 0, text: 'View'},
    {id: 1, text: 'Text'},
    {id: 2, text: 'Image'},
  ]
},
{
  id: 1,
  title: 'List Components',
  data: [
    {id: 3, text: 'ScrollView'},
    {id: 4, text: 'ListView'},
  ]
}];

const apiUrl = 'http://nearevent.mymine.ovh/api/'

export default class LaunchScreen extends Component {

  state = {
    eventTypes: {
      1: 'music',
      2: 'party',
      3: 'sport',
      4: 'game',
      5: 'meeting',
      6: 'help'
    },
    modalVisible: false,
    eventDetailsVisible: false,
    events: [
      /*{key: 1, location: {lat: 43.5416911, lng: 1.489664}, type: [1, 3], name: "Pizzeria Di Parma"},
      {key: 2, location: {lat: 43.5440261, lng: 1.4791632}, type: [0, 3], name: "Chez Michel"},
      {key: 3, location: {lat: 43.540439, lng: 1.4797479}, type: [3], name: "Pizza Nico"},*/
    ],
    range: 20,
    eventDetail: {},
    inputName: '',
    inputDesc: '',
    inputType: [],
    splashscreen: false,
    latitude: null,
    longitude: null,
    error: null,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setEventDetailsVisible(visible) {
    this.setState({eventDetailsVisible: visible});
  }

  setEvents(events) {
    this.setState({events: []});
    this.setState({events: events});
  }

  setEventDetail(eventDetails) {
    this.setState({eventDetail: eventDetails});
  }

  addEvent() {
    console.log('adding event ....');
    var lat = this.state.latitude;
    var lng = this.state.longitude;
    this.postEvent({location: {lat: lat, lng: lng}, type: this.state.inputType, name: this.state.inputName, description: this.state.inputDesc})
  }

  toggleType(number) {
    const newEventType = this.state.inputType;
    if (newEventType.indexOf(number) !== -1) {
      newEventType.splice(newEventType.indexOf(number), 1);
    } else {
      newEventType.push(number);
    }
    this.setState({inputType: newEventType});
  }

  actionTitle() {
    if (this.state.modalVisible || !this.state.eventDetailsVisible) {
      return "Add Event";
    } else {
      return "Go to Event";
    }
  }

  constructor(props) {
    super();
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.setState({splashscreen: true});
    console.log('splash');
    setTimeout(
      () => {
        this.setState({splashscreen: false});
        console.log('no splash');
        this.getEvents().then(
          (results) => {
            console.log('waiting results: ' + results);
            this.convertEvents(results);
          }
        ).catch(
          (error) => {
            console.log('error while waiting results:' + error);
          }
        );
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }, 2500
    );
  }

  render () {
    return (
      <View style={styles.container}> 
        <LinearGradient start={[0.1, 0.1]} end={[2, 1.5]} colors={['#f5740d', '#B3550A']}
              style={styles.navbar}>
          <Text style={{color: '#f7f1ed', textAlign: 'center'}}>NOW @{this.state.range} km</Text>
          <Image style={{width: 25, height: 25, borderRadius: 40, position: 'absolute', top: 15, right: 10}} source={{uri: 'http://www.clker.com/cliparts/T/Y/8/C/N/L/gear-icon-hi.png'}}></Image>
        </LinearGradient>
        <View style={styles.grid}>
          <FlatList
            style={styles.sectionList}
            data={this.state.events}
            extraData={this.state}
            renderItem={this.renderItem}
            keyExtractor={this.extractKey}
          />
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
            <Text style={{color: '#f7f1ed', fontSize: 40}}>+</Text>
          </TouchableHighlight>
        </View>
        <Modal 
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.navbar}>
            <Text>Add Event</Text>
            <Text style={styles.closeNavbar}
            onPress={() => {this.setEventDetailsVisible(false);this.setModalVisible(false);}}
            >x</Text>  
          </View>
          <View style={styles.grid}>
            <View style={styles.sectionList}>
              <View>
              <Picker
                selectedValue={this.state.inputType}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => this.setState({inputType: itemValue})}>
                <Picker.Item label="Music" value="1" />
                <Picker.Item label="Party" value="2" />
                <Picker.Item label="Sport" value="3" />
                <Picker.Item label="Game" value="4" />
                <Picker.Item label="Meeting" value="5" />
                <Picker.Item label="Help" value="6" />

              </Picker>
              </View>
              <View>
                <Text style={{padding: 10, fontSize: 12}}>
                  Name
                </Text>
                <TextInput
                  placeholder="Enter the name"
                  onChangeText={(text) => this.setState({inputName: text})}
                />
              </View>
              <View>
                <Text style={{padding: 10, fontSize: 12}}>
                  Description
                </Text>
                <TextInput
                  placeholder="What is the event about?"
                  onChangeText={(text) => this.setState({inputDesc: text})}
                />
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Button style={styles.button} title={this.actionTitle()} onPress={() => {this.addEvent();this.setModalVisible(!this.state.modalVisible);}}>
            </Button>
          </View>
        </Modal>
        <Modal 
          animationType="slide"
          transparent={false}
          visible={this.state.eventDetailsVisible}
        >
          <View style={styles.navbar}>
            <Text style={styles.titleNavbar}>eventDetailsVisible</Text>
            <Text style={styles.closeNavbar}
            onPress={() => {this.setEventDetailsVisible(false);this.setModalVisible(false);}}
            >x</Text>
          </View>
          <View style={styles.grid}>
            <View style={styles.sectionPhoto}>
              <Image source={require('./img/your-app.png')} />
            </View>
            <View style={styles.sectionEventDetails}>
              <Text>Type: {this.state.eventDetail.type}{"\n"}Name: {this.state.eventDetail.name}{"\n"}Description: </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button style={styles.button} title={this.actionTitle()} onPress={() => {
              showLocation({
                latitude: this.state.eventDetail.location.latitude,
                longitude: this.state.eventDetail.location.longitude,
                title: this.state.eventDetail.name,  // optional
                googleForceLatLon: true,  // optionally force GoogleMaps to use the latlon for the query instead of the title
                appsWhiteList: ['google-maps', 'apple-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
                // app: 'uber'  // optionally specify specific app to use
            })
            }}>
            </Button>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.splashscreen}
          onPress={() => {this.setState({splashscreen: false})}}>
            <View style={styles.splash}>
              <LinearGradient start={[0.1, 0.1]} end={[2, 1.5]} colors={['#f5740d', '#f7f1ed']}
              style={{ padding: 15, alignItems: 'center', borderRadius: 5, flex: 1 }}>
          <View
            style={{
              flex: 1
            }}>
            <Text style={styles.splashTitle}>"Ouvre toi à la muse, et la muse s'ouvrira à toi"</Text>
          </View>
        </LinearGradient>
            </View>
        </Modal>
      </View>
    )
  }

  photoPath() {
   return { source: require('../Images/your-app.png') }; 
  }

  renderItem = ({item}) => {
    return (
      <TouchableHighlight style={styles.card} onPress={() => {
        // this.setEventDetailsVisible(!this.state.eventDetailsVisible);
      // this.setEventDetail(item);console.log(item);
      showLocation({
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        title: item.name,  // optional
        googleForceLatLon: true,  // optionally force GoogleMaps to use the latlon for the query instead of the title
        appsWhiteList: ['google-maps', 'apple-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
        // app: 'uber'  // optionally specify specific app to use
    })}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.itemphoto}>
            <Image style={{width: 40, height: 40, borderRadius: 40}} source={{uri: 'https://cdn.patchcdn.com/assets/layout/contribute/user-default.png'}}>
          </Image>
          </View>
          <View style={styles.itemText}>
            <View style={{flex: 1}}>
              <Text>{item.name}</Text><Text>{item.description}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>-- km</Text>
            </View>
          </View>
          <View style={styles.itemType}>
            <Text>Type: {item.type}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  
  renderSectionHeader = ({section}) => {
    return (
      <Text style={styles.header}>
        {section.title}
      </Text>
    )
  }

  getEventInfo(idEvent){
    // Assemble data
    const event = {idEvent: idEvent}
    // Update data
    axios.post(this.apiUrl, event)
       .then((res) => {   
          console.log(res);
       });
  }

  async getEvents() {
    console.log('fetching api events ...');
    return fetch('http://nearevent.mymine.ovh/api/event/all')
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          return responseJson;
      })
      .catch((error) => {
          console.error(error);
      });
  }

  async postEvent(event) {
    console.log('posting new event ....');
    console.log(event);
    return fetch('http://nearevent.mymine.ovh/api/event/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: event.location.lat,
        longitude: event.location.lng,
        name: event.name,
        description: event.description,
        type: event.type,
      }),
    })
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.newFailed) {
          console.log('Post success !')
          console.log(responseJson);
          this.getEvents().then(
            (results) => {
              console.log('waiting results: ' + results);
              this.convertEvents(results);
            }
          ).catch(
            (error) => {
              console.log('error while waiting results:' + error);
            }
          );
          return responseJson;
        } else {
          console.log('Post failed !')
          console.log(responseJson.toString());
        }
      })
      .catch((error) => {
          console.error(error);
      });
  }

  convertEvents(eventsJson) {
    console.log('converting API results ....');
    console.log(eventsJson);
    console.log(this.state);
    const eventsDuplicate = eventsJson;
    for (const event of eventsDuplicate) {
      event.key = event.id;
      if (!event.type) {
        event.type = 'null';
      } else {
        switch (event.type) {
          case '1': 
            event.type = 'music';break;
          case '2': 
            event.type = 'party';break;
          case '3': 
            event.type = 'sport';break;
          case '4': 
            event.type = 'game';break;
          case '5': 
            event.type = 'meeting';break;
          case '6': 
            event.type = 'help';break;
          default: 
            event.type = 'null';break;
        }
      }
    }
    console.log(eventsDuplicate);
    this.setEvents(eventsDuplicate);
  }
}

/*
<Button title="Music" color={this.getColorButton(1)} onPress={() => this.toggleType(1)}></Button>
<Button title="Party" color={this.getColorButton(2)} onPress={() => this.toggleType(2)}></Button>
<Button title="Sport" color={this.getColorButton(3)} onPress={() => this.toggleType(3)}></Button>
<Button title="Game" color={this.getColorButton(4)} onPress={() => this.toggleType(4)}></Button>
<Button title="Meeting" color={this.getColorButton(5)} onPress={() => this.toggleType(5)}></Button>
<Button title="Help" color={this.getColorButton(6)} onPress={() => this.toggleType(6)}></Button>
*/
