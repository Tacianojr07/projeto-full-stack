import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { New } from '../screens/New';

const { Navigator, Screen} = createBottomTabNavigator();

export function appRoutes() {
    return(
        <Navigator>
            <Screen 
            name="new"
            component={New}
            />
        </Navigator>
    )
}
