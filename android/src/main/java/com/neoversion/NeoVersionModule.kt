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
  private var skippedVersionCode = neoPreference.getSkippedVersion()
  private var versionCode: Int? = null

  @ReactMethod
  fun getVersionInfo(promise: Promise) {

    val appUpdateInfoTask = appUpdateManager.appUpdateInfo
    appUpdateInfoTask.addOnFailureListener { err ->
      promise.reject("ERROR", err.toString())
    }
    appUpdateInfoTask.addOnSuccessListener { appUpdateInfo ->
      val storedStalenessDays = neoPreference.getStalenessDays()
      versionCode = appUpdateInfo.availableVersionCode()
      val updateAvailability = appUpdateInfo.updateAvailability()
      val stalenessDays = appUpdateInfo.clientVersionStalenessDays() ?: 0
      val isUpdateAvailable =
        updateAvailability == UpdateAvailability.UPDATE_AVAILABLE && stalenessDays > storedStalenessDays && versionCode!! > skippedVersionCode
      promise.resolve(isUpdateAvailable)
    }
  }

  @ReactMethod
  fun startUpdate(updateType: Int, promise: Promise) {
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
    neoPreference.saveStalenessDays(day)
  }

  @ReactMethod
  fun skipThisVersion() {
    versionCode?.let { neoPreference.saveSkippedVersion(it) }
  }

  companion object {
    const val NAME = "NeoVersion"
    const val IN_APP_UPDATE_REQUEST_CODE = 42139
  }
}
