import { Image, StyleSheet, Text } from "react-native";

type props = {
    indexImg: number
}

export default function ForcaImg({indexImg}:props){
    const images = [
        require('../assets/images/img1.png'),
        require('../assets/images/img2.png'),
        require('../assets/images/img3.png'),
        require('../assets/images/img4.png'),
        require('../assets/images/img5.png'),
        require('../assets/images/img6.png'),
        require('../assets/images/img7.png'),
    ];
    
    return <Image style={styles.img} source={images[indexImg]} />
}

const styles = StyleSheet.create({
    img: {
       height: 250,
       width:200
    }
})