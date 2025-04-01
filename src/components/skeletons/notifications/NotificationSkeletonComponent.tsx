import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';
import SessionComponent from '../../session/SessionComponent';
import NotificationSkeletonItem from './item/NotificationSkeletonItem';

const NotificationSkeletonComponent = () => {
  const handlePrintfSkeleton = useMemo(() => {
    const qty = Math.round(Math.random() * 5) + 2;
    const skeleton = Array.from({length: qty}, (_, i) => (
      <NotificationSkeletonItem key={i} />
    ));
    return skeleton;
  }, []);

  return (
    <ScrollView>
      <SessionComponent>{handlePrintfSkeleton}</SessionComponent>
    </ScrollView>
  );
};

export default NotificationSkeletonComponent;
