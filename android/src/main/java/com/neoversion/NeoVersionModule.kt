package com.neoversion

import android.content.IntentSender.SendIntentException
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.play.core.appupdate.AppUpdateManagerFactory
import com.google.android.play.core.install.model.UpdateAvailability

class NeoVersionModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  private val appUpdateManager = AppUpdateManagerFactory.create(reactContext)

  @ReactMethod
  fun getVersionInfo(promise: Promise) {
    val appUpdateInfoTask = appUpdateManager.appUpdateInfo
    appUpdateInfoTask.addOnFailureListener { err ->
      promise.reject("ERROR", err.toString())
    }
    appUpdateInfoTask.addOnSuccessListener { appUpdateInfo ->
      val map = Arguments.createMap()
      val updateAvailability = appUpdateInfo.updateAvailability()
      val isUpdateAvailable = updateAvailability == UpdateAvailability.UPDATE_AVAILABLE
      map.putBoolean("isUpdateAvailable", isUpdateAvailable)
      appUpdateInfo.clientVersionStalenessDays()?.let {
        map.putInt("stalenessDays", it)
      }
      promise.resolve(map)
    }
  }

  @ReactMethod
  fun startUpdate(updateType: Int = 0, promise: Promise) {
    val appUpdateInfoTask = appUpdateManager.appUpdateInfo
    appUpdateInfoTask.addOnFailureListener { err: Exception ->
      promise.reject("ERROR", err.toString())
    }
    appUpdateInfoTask.addOnSuccessListener { appUpdateInfo ->
      try {
        currentActivity?.let {
          appUpdateManager.startUpdateFlowForResult(
            appUpdateInfo,
            updateType,
            it,
            IN_APP_UPDATE_REQUEST_CODE
          )
        }
        promise.resolve("DONE")
      } catch (err: SendIntentException) {
        promise.reject("ERROR", err.toString())
      }
    }
  }

  companion object {
    const val NAME = "NeoVersion"
    const val IN_APP_UPDATE_REQUEST_CODE = 42139
  }
}
