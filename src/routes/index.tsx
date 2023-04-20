import { Box, useTheme } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useContext } from "react";
import { useAuth } from "@hooks/UseAuth";


export function Routes () {

const { user } = useAuth();


const { colors }= useTheme()
const theme = DefaultTheme;
theme.colors.background = colors.gray[700]

  return(
    <Box flex={1} bg="gray.700">
    <NavigationContainer  theme={theme}>
      <AuthRoutes />
    </NavigationContainer>
    </Box>
  )
}