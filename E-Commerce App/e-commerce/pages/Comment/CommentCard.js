import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import parseContentData from '../../utils/parseContentData'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'
import CommentTask from './CommentTask';
import { ref, push, set, onValue, off, get } from 'firebase/database';
export default function CommentCard({ productId }) {

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app)
    const commentDataRef = ref(database, `/comment/${productId}`)
    const InComingMessageDataRef = ref(database, `/fullcomment`)

    const [comment, setComment] = React.useState(null)
    const [commentList, setCommentList] = React.useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(commentDataRef);
                const commentData = snapshot.val();
                const parsedComment = parseContentData(commentData);
                
                setCommentList(parsedComment);
            } catch (error) {

            }
        };

        fetchData();

    }, []);


    function sendComment() {
        const username = auth.currentUser.email.split('@')[0]
        const commentObject = {
            comment: comment,
            username: username,
            date: new Date().toISOString()
        }

        const newCommentRef = push(commentDataRef)
        const newCommentData = commentObject
        set(newCommentRef, newCommentData)

        const newFullCommentRef = push(InComingMessageDataRef)
        const newFullCommentData = commentObject
        set(newFullCommentRef, newFullCommentData)

    }
    const renderContent = ({ item }) => <CommentTask commentMessage={item} />
    return (
        <SafeAreaView style={{ maxHeight: 250 }}>






            <FlatList
                data={commentList}
                renderItem={renderContent}
                ListHeaderComponent={
                    <>
                        <TextInput
                            style={[styles.commentInput, { color: 'black' }]}
                            placeholder='Ürüne Yorum yapınız'
                            placeholderTextColor="#A3B763"
                            onChangeText={setComment}
                            multiline
                        />

                        <TouchableOpacity style={styles.buttonComment} onPress={sendComment}>
                            <Text style={{ color: 'white', fontWeight: '700' }}>Gönder</Text>
                        </TouchableOpacity>
                    </>
                }
            />




        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commentInput: {
        height: 40,
        borderColor: '#A3B763',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonComment: {
        alignItems: 'center',
        backgroundColor: '#A3B763',
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        borderRadius: 13,
        marginTop: 15
    }

})