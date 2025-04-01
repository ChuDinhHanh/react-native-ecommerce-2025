import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';
import SessionComponent from '../../session/SessionComponent';
import BillSkeletonItem from './item/BillItem';

const BillSkeletonComponent = () => {
  const handlePrintfSkeleton = useMemo(() => {
    const qty = Math.round(Math.random() * 5) + 2;
    const skeleton = Array.from({length: qty}, (_, i) => (
      <BillSkeletonItem key={i} />
    ));
    return skeleton;
  }, []);

  return (
    <ScrollView>
      <SessionComponent>{handlePrintfSkeleton}</SessionComponent>
    </ScrollView>
  );
};

export default BillSkeletonComponent;
