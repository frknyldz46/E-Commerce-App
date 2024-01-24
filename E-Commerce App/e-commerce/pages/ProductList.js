import React, { useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, SafeAreaView, Image } from 'react-native';
import parseContentData from '../utils/parseContentData'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { ref, push, set, onValue, off } from 'firebase/database';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import Card from './Card/Card';
export default function ProductList() {
    const [originalContentList, setOriginalContentList] = React.useState([]);
    const [filteredContentList, setFilteredContentList] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app)

    const dataRef = ref(database, '/exampleData');
    const navigation = useNavigation();

    const handleSearch = (text) => {

        setSearchText(text);
        filterContentList(text);

    };

    const filterContentList = (text) => {
        if (!text) {

            setFilteredContentList(originalContentList);
        } else {

            const filteredList = originalContentList.filter((item) => {

                if (item && item.text) {
                    return item.text.toLowerCase().includes(text.toLowerCase());
                }
                return false;
            });
            setFilteredContentList(filteredList);
        }
    };


    useEffect(() => {

        const onDataChange = (snapshot) => {
            const contentData = snapshot.val()
            const parsedData = parseContentData(contentData)
            setOriginalContentList(parsedData);
            setFilteredContentList(parsedData);

        }

        onValue(dataRef, onDataChange);

        return () => {
            off(dataRef)
        }

    }, [])
    const renderContent = ({ item }) => <Card message={item} onPressProductDetails={() => navigateToProductDetails(item)} />
    const navigateToProductDetails = (productDetails) => {
        navigation.navigate('ProductDetails', { productDetails });
    };
    return (
        <SafeAreaView style={styles.usersContainer} >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../images/login_screen_logo.png')}
                        style={{ width: 50, height: 50 }}
                    />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#A3B763', marginLeft: 7 }}>Shopping</Text>

                </View>

                <Image
                    source={require('../images/shopping-basket.png')}
                    style={{ width: 30, height: 30 }}
                />
            </View>

            <View style={{ marginLeft: 15 }}>

                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Hoşgeldin {auth.currentUser.email.split('@')[0]},</Text>
                <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }}>Aradığın Ürünler Burada</Text>
            </View>



            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <SearchBar
                    placeholder="Ara..."
                    onChangeText={handleSearch}
                    value={searchText}
                    containerStyle={{ backgroundColor: '#A3B763', width: 300, borderRadius: 20, height: 50, borderColor: 'black', borderWidth: 2, marginTop: 15 }}
                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20, height: 33 }}
                />

            </View>
            <FlatList
                data={filteredContentList}
                renderItem={renderContent}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: 'space-evenly',
        marginTop: 10,
    
    },
    usersContainer: {
        backgroundColor: '#EEEEEE',
        flex:1

    },

})