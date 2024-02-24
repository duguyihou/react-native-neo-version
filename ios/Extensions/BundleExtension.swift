import Foundation

extension Bundle {
  struct Constants {
    static let displayName = "CFBundleDisplayName"
    static let shortVersionString = "CFBundleShortVersionString"
  }
  
  final class func version() -> String? {
    return Bundle.main.object(forInfoDictionaryKey: Constants.shortVersionString) as? String
  }
  
  final class func bestMatchingAppName() -> String {
    let bundleDisplayName = Bundle.main.object(forInfoDictionaryKey: Constants.displayName) as? String
    let bundleName = Bundle.main.object(forInfoDictionaryKey: kCFBundleNameKey as String) as? String
    
    return bundleDisplayName ?? bundleName ?? ""
  }
}


