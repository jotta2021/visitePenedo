import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function Layout() {
  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        drawerPosition: 'right', // Menu do Drawer será do lado direito
        headerLeft: () => null,  // Remove o botão do menu do lado esquerdo
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()} // Controla a abertura do Drawer
            style={{ marginRight: 15 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: '',
        
        }}
      />
      <Drawer.Screen
        name="Sair"
        options={{
          title: 'Sair',
        }}
      />
    </Drawer>
  );
}
