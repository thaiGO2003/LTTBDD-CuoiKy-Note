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
import { updateTodo, addTodo } from '../Slice/Slice'; // Import các actions từ slice
export default function Screen03({ navigation, route }) {
  const [todo, setTodo] = useState('');
  const { name = 'Twinkle', id = '0' } = route.params || {};
  const todos = useSelector((state) => state.todos.todos); // Truy cập todos từ Redux store
  const dispatch = useDispatch();
  const handleFinish = () => {
    if (id === '0') {
      // Nếu id là '0', nghĩa là đang thêm mới todo
      const newTodo = {
        id: String(new Date().getTime()), // Tạo id mới
        title: todo,
        checked: false,
      };
      dispatch(addTodo(newTodo)); // Gọi action thêm mới todo
    } else {
      // Nếu id khác '0', nghĩa là đang sửa todo
      const updatedTodo = {
        id,
        title: todo, // Cập nhật title mới
        checked: false, // Giữ nguyên trạng thái checked
      };
      dispatch(updateTodo(updatedTodo)); // Gọi action cập nhật todo
    }
    navigation.navigate('Screen02', { name }); // Điều hướng về màn hình danh sách
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../assets/images/girl.png')} />
          <View>
            <Text style={{ fontWeight: 'bold' }}>Hi {name}</Text>
            <Text>Have a nice day</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back.png')} />
        </TouchableOpacity>
      </View>
      {id == '0' ? (
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30 }}>
          ADD YOUR JOB
        </Text>
      ) : (
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30 }}>
          EDIT YOUR JOB
        </Text>
      )}

      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/note.png')}
          style={{ width: 20, height: 20 }}
        />
        <TextInput
          placeholder={id}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          style={{ fontSize: 20, width: '100%' }}
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: 'aqua', padding: 10, borderRadius: 100 }}
        onPress={() => 
          handleFinish()
        }>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>FINISH</Text>
      </TouchableOpacity>
      <Image source={require('../assets/images/banner.png')} />
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
