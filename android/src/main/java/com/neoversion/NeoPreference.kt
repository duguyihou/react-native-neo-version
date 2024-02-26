package com.neoversion

import android.content.Context
import android.content.SharedPreferences

class NeoPreference(private val context: Context) {
  private val sharedPreferences: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
  fun save(key: String, value: String) {
    val editor = sharedPreferences.edit()
    editor.putString(key, value)
    editor.apply()
  }
  fun save(key: String, value: Int) {
    val editor = sharedPreferences.edit()
    editor.putInt(key, value)
    editor.apply()
  }
  fun save(key : String, status: Boolean){
    val editor  = sharedPreferences.edit()
    editor.putBoolean(key, status)
    editor.apply()
  }

  fun getValueString(key: String): String? {
    return sharedPreferences.getString(key, null)
  }

  fun getValueInt(key: String): Int {
    return sharedPreferences.getInt(key, 0)
  }

  fun  getValueBoolean(key: String, defaultValue: Boolean) : Boolean{
    return sharedPreferences.getBoolean(key, defaultValue)
  }

  fun clearSharedPreferences(){
    val editor = sharedPreferences.edit()
    editor.clear()
    editor.apply()
  }

  fun removeValue(key: String){
    val editor = sharedPreferences.edit()
    editor.remove(key)
    editor.apply()
  }

  companion object {
    const val PREF_NAME = "neo-version-preference"
  }
}
