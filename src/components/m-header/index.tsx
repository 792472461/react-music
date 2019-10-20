import React from 'react';
import router from 'umi/router';
import { HeaderWrapper, LogoIcon } from './styles';

function goToPage(path: string): void {
  router.push(path);
}

const MHeader: React.FC = () => {
  const goToUser = () => {
    goToPage('/user');
  };
  return (
    <div>
      <HeaderWrapper>
        <LogoIcon imgUrl={require('./logo@2x.png')} />
        <h1 className="text">Chicken Music</h1>
        <div className="mine" onClick={goToUser}>
          <i className="icon-mine" />
        </div>
      </HeaderWrapper>
    </div>
  );
};

export default MHeader;
