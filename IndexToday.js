import React,{ Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  View,
  NavigatorIOS,
  ActivityIndicatorIOS,
  TouchableHighlight,
} from 'react-native';

function getTimeString(){
    var now = new Date();
    var REQUEST_URL = "http://apis.baidu.com/avatardata/historytoday/lookup"
        yue = now.getMonth() + 1,
        ri = now.getDate(),
        type = 1,
        page = 1,
        rows = 20,
        dtype = "JSON",
        format = false;
    return REQUEST_URL+'?yue='+yue+'&ri='+ri+'&type='+type+'&page='+page+'&rows='+rows+'&ttype='+dtype+'&format='+format;
}


export default class IndexToday extends Component {
  constructor(props) {
    super(props);
    this.state= {
      getDate: "",
      getDay: "",
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.fetchData = this.fetchData.bind(this);

  }
  componentDidMount(){
    this.catchDate();
    this.fetchData();
  }


  catchDate(){

    var now = new Date(),
        timeArr = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAT','SUNDAY'];
    this.setState({
      getDate: now.getDate(),
      getDay: timeArr[now.getDay()-1],
    })
  }


  fetchData() {
    var todayUrl = getTimeString();

    fetch(todayUrl,{
      headers: {
            Accept: 'application/json',
            apikey: "3b7d03fe34a43204738c0ad746fce9b4",
        }
    }).then((res) => res.json())
          .then((resData) =>{
            var newList = [];
            for( var i = 0; i < resData.result.length; i++) {
              var newWx = resData.result[i];
              if ('day' in newWx && 'month' in newWx &&  'title' in newWx && 'year' in newWx) {
                newList.push(newWx);
              }
            }
            console.log(newList);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newList),
            loaded: true,
          })
        }).done();
  }

  renderList(newWx) {
    return (
        <View style={styles.list}>
            <Text>--{newWx.year}</Text>
            <Text style={{marginLeft:10,}}>{newWx.title}</Text>
          </View>
    )
  }

  render(){
      if(!this.state.loaded){
        return (
            <View style={styles.topView}>
              <Text style={styles.myDate}>{ this.state.getDate }</Text>
              <Text style={styles.myDay}>{ this.state.getDay }</Text>
                <ActivityIndicatorIOS
                  animating = {true}
                  hidesWhenStopped = {true}
                  size="small"
                  color="#fff"
                />
          </View>
        )
      }else{
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderList}
            style={{marginTop: 65,}}
            />
        )
      }

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 65,
  },
  topView:{
    flex:1,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000',
  },
  myDay:{
    fontSize:14,
    color:'#fff',
    marginBottom: 70,
  },
  myDate: {
    fontSize:60,
    color:'#fff',
  },
  loadding:{
    alignItems:'center',
    justifyContent:'center',
  },
  list:{
    borderBottomWidth:1,
    borderColor:'gray',
    paddingBottom:10,
  }

})
