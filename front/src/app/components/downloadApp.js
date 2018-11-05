

// @flow weak

import React, {
  PureComponent
}                     from 'react';

 

const DownloadAppComponent = (props)=> {
  if (navigator.platform==="iPhone") {
    window.location.href = "https://itunes.apple.com/us/app/we-plan/id1421335318?ls=1&mt=8";
  }else{
    window.location.href = "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.weplan&ddl=1&pcampaignid=web_ddl_1";
  }
    return(
      <div>Cargando...</div>
    );
}
 
export default DownloadAppComponent;

