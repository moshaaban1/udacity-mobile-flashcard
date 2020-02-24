import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Dashboard from "./Dashboard"


const Tab = createBottomTabNavigator({
    Dashboard: {
        screen: Dashboard
    }
});

export default createAppContainer(Tab);
