// components/Screen02.js
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  CheckBox,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  toggleTodo, removeTodo } from '../Slice/Slice'; // Import các actions từ slice
import {fetchTodos} from '../Slice/Slice';

export default function Screen02({ navigation, route }) {
  const [search, setSearch] = useState('');
  const { name = "Thinh" } = route.params || {};
  const todos = useSelector((state) => state.todos.todos); // Truy cập todos từ Redux store
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.todos.loading); // Truy cập todos từ Redux store

  useEffect(() => {
    // Only dispatch fetchTodos if todos array is empty or loading is true
    if (todos.length === 0 && !loading) {
      dispatch(fetchTodos());
    }
  }, [dispatch, todos.length, loading]); // Depend on todos and loading state

  const filterTodo = todos.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckboxChange = (id) => {
    dispatch(toggleTodo(id)); // Gọi action toggleTodo để cập nhật trạng thái checked
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id)); // Gọi action removeTodo để xóa todo
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/images/girl.png')} />
          <View>
            <Text style={{ fontWeight: 'bold' }}>Hi {name}</Text>
            <Text>Have a nice day</Text>
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: 'white', borderWidth: 1, padding: 10, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/images/search.png')} style={{ width: 20, height: 20 }} />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={{ fontSize: 20, width: '100%' }}
        />
      </View>

      <FlatList
        style={{ width: '100%' }}
        data={filterTodo}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.todoRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <CheckBox
                  value={item.checked}
                  onValueChange={() => handleCheckboxChange(item.id)} // Gọi handleCheckboxChange khi checkbox thay đổi
                />
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity onPress={() => {
                const id = item.id;
                navigation.navigate('Screen03', { id });
              }}>
                <Image source={require('../assets/images/edit.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
                <Image source={require('../assets/images/edit.png')} />
              </TouchableOpacity></View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={{ backgroundColor: 'aqua', padding: 10, borderRadius: 100 }}
        onPress={() => {
          navigation.navigate('Screen03');
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
    gap: 10,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'lightgray',
    padding: 10,
    marginVertical: 10,
  },
});
