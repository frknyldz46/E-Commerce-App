import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, Text } from 'react-native'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config';
import { getDatabase } from 'firebase/database';
import { ref, get } from 'firebase/database';
import CommentTask from './CommentTask';
import parseContentData from '../../utils/parseContentData'
export default function InCommingMessage() {

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
 
    


    const InComingMessageDataRef = ref(database, `/fullcomment`)

    const [commentList, setCommentList] = React.useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(InComingMessageDataRef);
                const commentData = snapshot.val();
                const parsedComment = parseContentData(commentData);
                setCommentList(parsedComment);
                
                
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);
    

    const renderContent = ({ item }) => <CommentTask commentMessage={item} />
    return (
        <SafeAreaView>
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',marginTop:20}}>
            Gelen Mesajlar
        </Text>

            <FlatList
                data={commentList}
                renderItem={renderContent}
            />
        </SafeAreaView>
    )
}
