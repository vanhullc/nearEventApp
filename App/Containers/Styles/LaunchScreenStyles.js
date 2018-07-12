import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'
import { Font } from 'expo';

Font.loadAsync({
  'scripalt': require('../../font/SCRIPALT.ttf'),
});

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'black',
		// linearGradient: '(90deg, #f7f1ed (22px - 2px), transparent 1%) center',
		// linearGradient: '(#f7f1ed (22px - 2px), transparent 1%) center, #f5740d',
	  // backgroundSize: '22px 22px'
  },
  logo: { 
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  navbar: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.5,
    backgroundColor: '#f5740d',
  },
  grid: {
    flexDirection: 'column',
    flex: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f1ed',
  },
  card: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 16, height: 16 },
  },
  button: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f5740d',
    borderWidth: 1,
    borderTopWidth: 1,
    borderRadius: 10,
    borderColor: '#a08772',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionList: {
    flex: 1,
    width: '100%'
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
    flex: 1,
    flexDirection: 'row'
  },
  header: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    width: '20%',
    height: '10%',
    bottom: 0,
    left: '40%',
    backgroundColor: '#f7f1ed',
  },
  closeNavbar: {
    position: 'absolute',
    right: 10 
  },
  titleNavbar: {
    // 
  },
  sectionPhoto: {
    height: 200,
    marginTop: 20,
    width: '90%'
  },
  sectionEventDetails: {
    marginTop: 20,
    flex: 1,
    width: '90%'
  },
  splash: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'black'
  },
  splashTitle: {
    top: '45%',
    alignItems: 'center',
    textAlign: 'center',
    padding: .25,    
    fontWeight: '600',
    fontSize: 30,
    color: 'white',
    fontFamily: 'scripalt',
    position: 'relative',
    // lineHeight: 1.3
  },
  itemphoto: {
    flex: 1,
    flexDirection: 'column',
  },
  itemText: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemType: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
  }
})