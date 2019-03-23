import {

    createStackNavigator

} from 'react-navigation';

import ScreenOne from '../screens/screenone/screenOne';
import ScreenTwo from '../screens/screentwo/screenTwo';
import ScreenThree from '../screens/screenthree/screenThree';
import ScreenFour from '../screens/loadingScreen/screenFour';
import ScreenHelp from '../screens/screenone/screenHelp';
import ScreenLampada from '../screens/screenone/screenLampada';
import ScreenHome from '../screens/screenone/screenHome';

const App = createStackNavigator(

    {ScreenOne,ScreenTwo,ScreenThree,ScreenFour,ScreenHelp,ScreenHome,ScreenLampada}
    ,
    {
        initialRouteName: 'ScreenOne',
    }
);

export default App;