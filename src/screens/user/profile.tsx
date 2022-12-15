import {Button, Column, Input, useColorMode} from 'native-base';

import {
  userActions,
  appActions,
  useAppDispatch,
  useAppSelector,
} from '../../app/appStore';


export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state.user.name);
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const {toggleColorMode} = useColorMode();

  return (
    <Column
      alignItems="center"
      justifyContent="center"
      space="4"
      padding="4"
      height="full">
      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={name => {
          dispatch(
            userActions.setName({
              name,
            }),
          );
        }}
      />
      <Button
        width="full"
        onPress={() => {
          toggleColorMode();
          dispatch(
            appActions.setDarkTheme({
              isDarkTheme: !isDarkTheme,
            }),
          );
        }}>
        Alterar Tema
      </Button>
    </Column>
  );
}
