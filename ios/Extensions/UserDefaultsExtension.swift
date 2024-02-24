import Foundation

extension UserDefaults {
  private enum NeoKeys: String {
    case StoredVersionCheckDate
    case StoredSkippedVersion
  }

  static var storedSkippedVersion: String? {
    get {
      return standard.string(forKey: NeoKeys.StoredSkippedVersion.rawValue)
    }
    set {
      standard.set(newValue, forKey: NeoKeys.StoredSkippedVersion.rawValue)
    }
  }

  static var alertPresentationDate: Date? {
    get {
      return standard.object(forKey: NeoKeys.StoredVersionCheckDate.rawValue) as? Date
    }
    set {
      standard.set(newValue, forKey: NeoKeys.StoredVersionCheckDate.rawValue)
    }
  }
}
