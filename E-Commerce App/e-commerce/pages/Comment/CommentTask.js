import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function CommentTask({ commentMessage }) {
    


    return (

        <SafeAreaView style={styles.commentMessageContainer}>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '500', color: 'gray' }}>{commentMessage.username}</Text>
                    <Text style={{ fontWeight: '500', color: 'gray' }}>{commentMessage.date}</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 5 }}>{commentMessage.comment}</Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    commentMessageContainer: {
        backgroundColor: '#A3B763',
        marginTop: 10,
        borderRadius: 20
    }
})

