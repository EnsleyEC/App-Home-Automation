import {

    createStackNavigator

} from 'react-navigation';

import ScreenOne from '../screens/screenone/screenOne';
import ScreenTwo from '../screens/screentwo/screenTwo';
import ScreenThree from '../screens/screenthree/screenThree';
import ScreenFour from '../screens/loadingScreen/screenFour';
import ScreenHelp from '../screens/threeIcons/screenHelp';
import ScreenLampada from '../screens/threeIcons/screenLampada';
import ScreenHome from '../screens/threeIcons/screenHome';
import ScreenContract from '../screens/screenContract'

const App = createStackNavigator(

    {ScreenOne,ScreenTwo,ScreenThree,ScreenFour,ScreenContract,ScreenHelp,ScreenHome,ScreenLampada}
    ,
    {
        initialRouteName: 'ScreenContract',
    }
);

export default App;