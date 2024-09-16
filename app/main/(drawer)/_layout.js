import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { signOut } from 'firebase/auth'; // Importa sua função de logout do Firebase
import { useRouter } from 'expo-router'; // Para navegação programática

export default function Layout() {
  const router = useRouter();



  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        drawerPosition: 'right',
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
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
          title: 'Principal',
          headerTitle:''
        }}
      />
      <Drawer.Screen
        name="logout"
        options={{
          title: 'Sair',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      
      />
    </Drawer>
  );
}
