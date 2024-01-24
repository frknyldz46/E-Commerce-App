import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import CommentCard from './Comment/CommentCard';
const Tab = ({ title, onPress, isActive }) => (
    <TouchableOpacity style={[styles.tab, isActive && styles.activeTab]} onPress={onPress}>
        <Text style={isActive ? styles.activeTabText : styles.tabText}>{title}</Text>
    </TouchableOpacity>
);

const TabBar = ({ tabs, onTabPress }) => {
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        onTabPress(tab);
    };

    return (
        <View style={styles.tabBar}>
            {tabs.map((tab) => (
                <Tab
                    key={tab}
                    title={tab}
                    onPress={() => handleTabPress(tab)}
                    isActive={activeTab === tab}
                />
            ))}
        </View>
    );
};



export default function ProductDetails({ route }) {


    const { productDetails } = route.params
    const [selectedTabContent, setSelectedTabContent] = React.useState(productDetails.detayAciklama);
    const handleTabPress = (tab) => {
        console.log(`Tab pressed: ${tab}`);
        switch (tab) {
            case 'Ürün Özellikleri':
                setSelectedTabContent(productDetails.detayAciklama);
                break;
            case 'Yorumlar':
                setSelectedTabContent('comment');
                break;
            
            default:
                setSelectedTabContent('Varsayılan içerik.');
                break;
        }

    };

    const tabs = ['Ürün Özellikleri', 'Yorumlar'];


    return (
        <SafeAreaView style={styles.cardDetailsContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                <Image
                    source={{ uri: productDetails.imageUri }}
                    style={{ width: 200, height: 200, borderRadius: 15 }}
                />
            </View>
            <View style={styles.productTitle}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{productDetails.text}</Text>
                <Text style={{ fontSize: 18, color: 'red', fontWeight: '600' }}>${productDetails.fiyat}</Text>

            </View>


            <View style={{ marginTop: 15 }}>
                <TabBar tabs={tabs} onTabPress={handleTabPress} />

                {selectedTabContent === 'comment' && <CommentCard productId={productDetails.productId} />}
                {selectedTabContent !== 'comment' && <Text>{selectedTabContent}</Text>}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1}}>
                <TouchableOpacity style={styles.buttonDetailsAl} >
                    <Text style={{ color: 'black', fontWeight: '700' }}>Şimdi Al</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDetailsSepet} >
                    <Text style={{ color: 'white', fontWeight: '700' }}>Sepete Ekle</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    cardDetailsContainer: {
        margin: 15,
        flex: 1
    },
    productTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },

    tabBar: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: '#333',
    },
    activeTab: {
        backgroundColor: '#A3B763',
        borderRadius: 10
    },
    activeTabText: {
        color: '#fff',
    },
    buttonDetailsAl: {
        alignItems: 'center',

        width: 100,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 13,
        marginTop: 15,
        width: 130,
        height: 50,
        borderWidth: 2,
        borderColor: '#A3B763'
    },
    buttonDetailsSepet: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A3B763',
        width: 180,
        padding: 10,
        borderRadius: 13,
        marginTop: 15,
        height: 50
    }
})
