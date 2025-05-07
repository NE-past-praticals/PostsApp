import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function WelcomeSvg() {
    return (
        <View style={{
            width: 200,
            height: 200
        }}>
            <SvgUri
                width='100%'
                height='100%'
                uri={require('../assets/images/welcome.svg')}
            />
        </View>
    )
}