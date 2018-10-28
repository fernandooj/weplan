import { Platform, AsyncStorage, AppState } from 'react-native';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";

AsyncStorage.getItem('lastNotification').then((err, data)=>{
  if(data){
    // if notification arrives when app is killed, it should still be logged here
    console.log('last notification', JSON.parse(data));
    console.log(data)
    console.log(data)
    console.log(err)
    AsyncStorage.removeItem('lastNotification');
  }
})

AsyncStorage.getItem('lastMessage').then(data=>{
  if(data){
    // if notification arrives when app is killed, it should still be logged here
    console.log('last message', JSON.parse(data));
    AsyncStorage.removeItem('lastMessage');
  }
})

 

export function registerKilledListener(){
  // these callback will be triggered even when app is killed
  FCM.on(FCMEvent.Notification, notif => {

  // if notification arrives when app is killed, it should still be logged here
  if (notif.parameter) {      
    let parameter = notif.parameter ?notif.parameter :JSON.parse(notif.custom_notification)

    //////////////////////////////////////////  GUARDO EL NUMERO DEL BADGE
    AsyncStorage.getItem('badge').then((data)=>{
      if (data==='null' || data===null) {
        AsyncStorage.setItem('badge', '1');
      }
      data = data ?data :0
      data = JSON.parse(data)
      data = parseInt(data)

      data = data+1
      console.log(data)
      FCM.setBadgeNumber(data);  
     AsyncStorage.setItem('badge', JSON.stringify(data));
       
    })    
    //////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////   GUARDO EL ARRAY DEL BADGE
    AsyncStorage.getItem('badgeArray').then((data)=>{
      if (data=='null' || data==="null" || data==null) {
        AsyncStorage.setItem('badgeArray', '[]');
      
      }
      console.log(data)
      data = JSON.parse(data)
      console.log(data)
      data = typeof data==='object' ?data :[]
      let parametro = parameter ?parameter :1
      console.log(data)
      
      data.push(parametro)
     
      AsyncStorage.setItem('badgeArray', JSON.stringify(data));
    })
    ///////////////////////////////////////////////////////////////
  }
   

    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
  
    if(notif.opened_from_tray){
      setTimeout(()=>{
        if(notif._actionIdentifier === 'reply'){
          if(AppState.currentState !== 'background'){
            console.log('User replied '+ JSON.stringify(notif._userText))
            alert('User replied '+ JSON.stringify(notif._userText));
          } else {
            AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));
          }
        }
        if(notif._actionIdentifier === 'view'){
          alert("User clicked View in App");
        }
        if(notif._actionIdentifier === 'dismiss'){
          alert("User clicked Dismiss");
        }
      }, 1000)
    }
  });
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation){
  FCM.on(FCMEvent.Notification, notif => {
    console.log(notif);

    if(Platform.OS ==='ios' && notif._notificationType === NotificationType.WillPresent && !notif.local_notification){
      // this notification is only to decide if you want to show the notification when user if in foreground.
      // usually you can ignore it. just decide to show or not.
      notif.finish(WillPresentNotificationResult.All)
      return;
    }

    if(notif.opened_from_tray){
      let id = notif.parameter
      setTimeout(()=>{
        navigation.navigate(notif.targetScreen, id)
      }, 500)
    }

    if(Platform.OS ==='ios'){
            //optional
            //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //notif._notificationType is available for iOS platfrom
            switch(notif._notificationType){
              case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
              case NotificationType.NotificationResponse:
                notif.finish();
                break;
              case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                // this type of notificaiton will be called only when you are in foreground.
                // if it is a remote notification, don't do any app logic here. Another notification callback will be triggered with type NotificationType.Remote
                break;
            }
    }
  });

  FCM.on(FCMEvent.RefreshToken, token => {
    console.log("TOKEN (refreshUnsubscribe)", token);
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    console.log('direct channel connected' + data);
  });
  setTimeout(function() {
    FCM.isDirectChannelEstablished().then(d => console.log(d));
  }, 100);
}

FCM.setNotificationCategories([
  {
    id: 'com.myidentifi.fcm.text',
    actions: [
      {
        type: NotificationActionType.TextInput,
        id: 'reply',
        title: 'Quick Reply',
        textInputButtonTitle: 'Send',
        textInputPlaceholder: 'Say something',
        intentIdentifiers: [],
        options: NotificationActionOption.AuthenticationRequired
      },
      {
        type: NotificationActionType.Default,
        id: 'view',
        title: 'View in App',
        intentIdentifiers: [],
        options: NotificationActionOption.Foreground
      },
      {
        type: NotificationActionType.Default,
        id: 'dismiss',
        title: 'Dismiss',
        intentIdentifiers: [],
        options: NotificationActionOption.Destructive
      }
    ],
    options: [NotificationCategoryOption.CustomDismissAction, NotificationCategoryOption.PreviewsShowTitle]
  }
])