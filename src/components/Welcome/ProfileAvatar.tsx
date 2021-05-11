import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Menu } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function ProfileAvatar({
  username,
  logout,
}: {
  username: string;
  logout: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <>
      {username && (
        <View style={styles.container}>
          <Menu
            visible={visible}
            contentStyle={{marginTop:40,marginRight:20}}
            onDismiss={closeMenu}
            anchor={
              <Pressable onPress={openMenu}>
                <Avatar.Text
                  size={30}
                  label={username.charAt(0).toUpperCase()}
                  style={{ marginHorizontal: 10 }}
                />
              </Pressable>
            }
          >
            <Menu.Item onPress={() => logout()} title="Logout" />
          </Menu>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // top: -10,
    top: 10 + getStatusBarHeight(),
    right: 4,
  },
});
