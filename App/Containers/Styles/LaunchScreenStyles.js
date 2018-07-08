import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'black',
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
    flex: 1,
    backgroundColor: 'red',
  },
  grid: {
    flexDirection: 'column',
    flex: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  button: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionList: {
    marginTop: 20,
    flex: 1,
    width: '90%'
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
    flex: 2,
    backgroundColor: 'green',
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
})
