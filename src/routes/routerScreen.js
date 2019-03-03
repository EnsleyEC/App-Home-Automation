import {

    createStackNavigator

} from 'react-navigation';

import ScreenOne from '../screens/screenone/screenOne';
import ScreenTwo from '../screens/screentwo/screenTwo';
import ScreenThree from '../screens/screenthree/screenThree';
import ScreenFour from '../screens/screenfour/screenFour';

const App = createStackNavigator(

    {ScreenOne,ScreenTwo,ScreenThree,ScreenFour}
    ,
    {
        initialRouteName: 'ScreenOne',
    }
);



export default App;