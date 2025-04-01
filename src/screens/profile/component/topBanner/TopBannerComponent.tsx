import React from 'react';
import {View} from 'react-native';
import DefaultAvatar from '../../../../components/common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../../../components/row/RowComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import HeaderToolbarComponent from '../../../../components/toolbars/headerToolbar/common/HeaderToolbarComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {moderateScale, scale} from '../../../../utils/ScaleUtils';
import {useAppSelector} from '../../../../redux/Hooks';

const TopBannerComponent = () => {
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  return (
    <View style={{backgroundColor: Colors.GREEN_500}}>
      <SessionComponent>
        <HeaderToolbarComponent
          iconColor={Colors.WHITE}
          iconSize={Variables.ICN_SIZE_TOP_TAB}
        />
        <SpaceComponent height={moderateScale(10)} />
        {/* User info */}
        <RowComponent justifyContent="flex-start" alignItems="center">
          {/* Left */}
          <DefaultAvatar
            image={userLogin?.avatar}
            name={userLogin?.name ?? userLogin?.email ?? ''}
          />
          {/* Space */}
          <SpaceComponent width={moderateScale(10)} />
          {/* Right */}
          <View>
            <TextComponent
              fontSize={scale(18)}
              text={userLogin?.name ?? userLogin?.email ?? ''}
              fontWeight="bold"
            />
            {/* Follow and Follower */}
            <RowComponent justifyContent="flex-start" alignItems="center">
              <TextComponent text="Đang theo dõi" />
              <SpaceComponent width={moderateScale(5)} />
              <TextComponent fontWeight="bold" text="3" />
            </RowComponent>
          </View>
        </RowComponent>
      </SessionComponent>
    </View>
  );
};

export default TopBannerComponent;
