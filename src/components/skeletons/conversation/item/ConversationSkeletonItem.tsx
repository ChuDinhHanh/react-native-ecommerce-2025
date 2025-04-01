import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {styles} from './ConversationSkeletonItem.style';

const ConversationSkeletonItem = () => {
  return (
    <View style={styles.container}>
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <SkeletonPlaceholder key={index}>
            <View
              style={[
                styles.messageWrapper,
                index % 2 === 0 ? styles.senderA : styles.senderB,
              ]}>
              <View style={styles.avatar} />
              <View style={styles.messageContent}>
                <SkeletonPlaceholder.Item
                  width={index % 2 === 0 ? 180 : 150}
                  height={20}
                  borderRadius={5}
                />
                <SkeletonPlaceholder.Item
                  width={index % 2 === 0 ? 120 : 100}
                  height={20}
                  borderRadius={5}
                  marginTop={6}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
        ))}
    </View>
  );
};

export default ConversationSkeletonItem;
