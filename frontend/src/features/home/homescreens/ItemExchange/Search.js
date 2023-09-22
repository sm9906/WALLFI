import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function Search() {

  return (
    <View style={search.searchContainer}>
      <View style={search.searchBox}>
        <TextInput style={{ marginHorizontal: '5%', marginVertical: '3%' }} placeholder='검색어를 입력해 주세요'/>
      </View>
      <TouchableOpacity style={search.searchBtn}>
        <Text style={search.searchText}>검색</Text>
      </TouchableOpacity>
    </View>
  )
}

const search = StyleSheet.create({
  searchContainer: { 
    flex: 1, 
    width: '80%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  searchBox: { 
    flex: 4, 
    height: '50%', 
    backgroundColor: 'white',
    marginHorizontal: '2%',
    borderWidth: 1,
    borderColor: 'black',
  },
  searchBtn: { 
    flex: 1, 
    height: '50%', 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  searchText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B1C47'
  }
})