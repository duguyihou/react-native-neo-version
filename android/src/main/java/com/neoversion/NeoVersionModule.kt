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
  private val neoPreference = NeoPreference(reactContext)

  @ReactMethod
  fun getVersionInfo(promise: Promise) {

    val appUpdateInfoTask = appUpdateManager.appUpdateInfo
    appUpdateInfoTask.addOnFailureListener { err ->
      promise.reject("ERROR", err.toString())
    }
    appUpdateInfoTask.addOnSuccessListener { appUpdateInfo ->
      val storedStalenessDays = neoPreference.getValueInt("storedStalenessDays")
      val updateAvailability = appUpdateInfo.updateAvailability()
      val stalenessDays = appUpdateInfo.clientVersionStalenessDays() ?: 0
      val isUpdateAvailable = updateAvailability == UpdateAvailability.UPDATE_AVAILABLE && stalenessDays > storedStalenessDays
      promise.resolve(isUpdateAvailable)
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

  @ReactMethod
  fun presentNextTime(day: Int) {
    neoPreference.save("storedStalenessDays", day)
  }

  companion object {
    const val NAME = "NeoVersion"
    const val IN_APP_UPDATE_REQUEST_CODE = 42139
  }
}
