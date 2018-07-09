import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, Button, Modal, TouchableHighlight, TextInput } from 'react-native'
import { Images } from '../Themes'
import { FullButton } from '../Components/FullButton'
import { showLocation } from 'react-native-map-link'

// Icons
// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Styles
import styles from './Styles/LaunchScreenStyles'

const extractKey = ({item}) => item.key

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
}]

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
      {key: 1, location: {lat: 43.5416911, lng: 1.489664}, type: [1, 3], name: "Pizzeria Di Parma"},
      {key: 2, location: {lat: 43.5440261, lng: 1.4791632}, type: [0, 3], name: "Chez Michel"},
      {key: 3, location: {lat: 43.540439, lng: 1.4797479}, type: [3], name: "Pizza Nico"},
    ],
    eventDetail: {},
    inputName: '',
    inputDesc: '',
    inputType: [],
    splashscreen: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setEventDetailsVisible(visible) {
    this.setState({eventDetailsVisible: visible});
  }

  setEvents(events) {
    this.setState({events: events});
  }

  setEventDetail(eventDetails) {
    this.setState({eventDetail: eventDetails});
  }

  addEvent() {
    var lat = 0;
    var lng = 0;
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        lng = loc.coords.longitude;
        lat = loc.coords.latitude;
        const newEvents = this.state.events;
        newEvents.push({key: 4, location: {lat: lat, lng: lng}, type: this.state.inputType, name: this.state.inputName, description: this.state.inputDesc});
        this.setState({events: newEvents});
      }
    )
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
  }

  componentDidMount() {
    this.setState({splashscreen: true});
    console.log('splash');
    setTimeout(
      () => {
        this.setState({splashscreen: false});
        console.log('no splash');
      }, 2500
    );
  }

  render () {
    return (
      <View style={styles.container}> 
        <View style={styles.navbar}>
          <Text>Working page</Text>       
        </View>
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
          <Button style={styles.button} title={this.actionTitle()} onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
          </Button>
        </View>
        <Modal 
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('modal has been closed');
          }}
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
                <Button title="Music" onPress={() => this.toggleType(1)}></Button>
                <Button title="Party" onPress={() => this.toggleType(2)}></Button>
                <Button title="Sport" onPress={() => this.toggleType(3)}></Button>
                <Button title="Game" onPress={() => this.toggleType(4)}></Button>
                <Button title="Meeting" onPress={() => this.toggleType(5)}></Button>
                <Button title="Help" onPress={() => this.toggleType(6)}></Button>
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
              <View>
                <Text style={{padding: 10, fontSize: 12}}>
                  Add a picture
                </Text>
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
          onRequestClose={() => {
            alert('modal has been closed');
          }}
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
                latitude: this.state.eventDetail.location.lat,
                longitude: this.state.eventDetail.location.lng,
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
          onRequestClose={() => {
            alert('modal has been closed');
          }}>
            <View style={styles.splash}>
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
      <Text style={styles.row} onPress={() => {this.setEventDetailsVisible(!this.state.eventDetailsVisible);
      this.setEventDetail(item);console.log(item);}}>
        {item.name}
      </Text>
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

  getEvents(location, range){
    // Assemble data
    const event = {location: location, range: range}
    // Update data
    axios.post(this.apiUrl, event)
       .then((res) => {
          console.log(res);
       });
  }

  postEvent(location, type, name, description){
    // Assemble data
    const event = {location: location, type: type, name: name, description: description}
    // Update data
    axios.post(this.apiUrl, event)
       .then((res) => {
          console.log(res);
       });
  }
}
