import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, Button, Modal, TouchableHighlight, TextInput } from 'react-native'
import { Images } from '../Themes'
import { FullButton } from '../Components/FullButton'

// Icons
// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Styles
import styles from './Styles/LaunchScreenStyles'

const extractKey = ({item}) => item.id

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
    modalVisible: false,
    eventDetailsVisible: false,
    events: [
      {key: 1, location: {lat: 38.285028, lng: 25.8989223}, type: [1, 3], name: "test1"},
      {key: 2, location: {lat: 38.285028, lng: 25.8989223}, type: [0, 3], name: "test2"},
      {key: 3, location: {lat: 38.285028, lng: 25.8989223}, type: [3], name: "test3"},
    ],
    eventDetail: null,
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

  setEventDetail(eventDetail) {
    this.setState({eventDetail: eventDetail});
  }

  addEvent() {
    this.state.events.push({key: 3, location: {lat: 38.285028, lng: 25.8989223}, type: [3], name: "test4"});
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
                <Button title="Music"></Button>
                <Button title="Sport"></Button>
                <Button title="Party"></Button>
                <Button title="Help"></Button>
              </View>
              <View>
                <Text style={{padding: 10, fontSize: 12}}>
                  Name
                </Text>
                <TextInput
                  placeholder="Enter the name"
                  // onChangeText={(text) => this.setState({text})}                 {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                />
              </View>
              <View>
                <Text style={{padding: 10, fontSize: 12}}>
                  Description
                </Text>
                <TextInput
                  placeholder="What is the event about?"
                  // onChangeText={(text) => this.setState({text})}                 {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
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
            <Button style={styles.button} title={this.actionTitle()} onPress={() => {this.setModalVisible(!this.state.modalVisible);this.addEvent()}}>
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
              <Text>Type{"\n"}Name{"\n"}Description</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button style={styles.button} title={this.actionTitle()} onPress={() => {this.setEventDetailsVisible(!this.state.eventDetailsVisible);}}>
            </Button>
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
      <Text style={styles.row} onPress={() => {this.setEventDetailsVisible(!this.state.eventDetailsVisible);}}>
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
