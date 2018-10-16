package com.weplan;

import android.app.Application;
import com.facebook.react.ReactApplication;
import org.reactnative.camera.RNCameraPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.imagepicker.ImagePickerPackage;
import com.wix.pagedcontacts.PagedContactsPackage;
import com.magus.fblogin.FacebookLoginPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNCameraPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new FIRMessagingPackage(),
            new ImagePickerPackage(),
            new RNGoogleSigninPackage(),
            new FacebookLoginPackage(),
            new MapsPackage(),
            new ReactNativeDocumentPicker(),
            new PagedContactsPackage(),
            new RNAndroidLocationEnablerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
