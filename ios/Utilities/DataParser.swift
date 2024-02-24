import Foundation

struct DataParser {
  static func hasNewerVersion(_ installedVersion: String?, _ appStoreVersion: String?) -> Bool {
    guard let installedVersion = installedVersion,
          let appStoreVersion = appStoreVersion,
          (installedVersion.compare(appStoreVersion, options: .numeric) == .orderedAscending) else {
      return false
    }
    
    return true
  }
  
  static func isUpdateCompatible(for minimumOSVersion: String) -> Bool {

    let systemVersion = UIDevice.current.systemVersion
    
    guard systemVersion.compare(minimumOSVersion, options: .numeric) == .orderedDescending ||
            systemVersion.compare(minimumOSVersion, options: .numeric) == .orderedSame else {
      return false
    }
    
    return true
  }
  
  static func parseForUpdate(for installedVersion: String?,
                             and appStoreVersion: String?) -> UpdateType {
    guard let installedVersion = installedVersion,
          let appStoreVersion = appStoreVersion else {
      return .unknown
    }
    
    let oldVersion = split(version: installedVersion)
    let newVersion = split(version: appStoreVersion)
    
    guard let newVersionFirst = newVersion.first,
          let oldVersionFirst = oldVersion.first else {
      return .unknown
    }
    
    if newVersionFirst > oldVersionFirst {
      return .major
    } else if newVersion.count > 1 && (oldVersion.count <= 1 || newVersion[1] > oldVersion[1]) {
      return .minor
    } else if newVersion.count > 2 && (oldVersion.count <= 2 || newVersion[2] > oldVersion[2]) {
      return .patch
    } else {
      return .unknown
    }
  }
  
  private static func split(version: String) -> [Int] {
    return version.lazy.split {$0 == "."}.map { String($0) }.map {Int($0) ?? 0}
  }
}
