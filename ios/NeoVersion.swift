@objc(NeoVersion)
public class NeoVersion: NSObject {

  lazy var currentVersion: String? = Bundle.version()
  //  lazy var currentVersion: String? = "451.0.1"

  private var appStoreVersion: String?
  private var appId: Int?
  private var alertPresentationDate: Date?

  @objc
  func getVersionInfo(_ countryCode: String,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
    alertPresentationDate = UserDefaults.alertPresentationDate ?? Date()
    Task(priority: .userInitiated, operation: {
      guard let updateType = await performVersionCheck(countryCode) else {
        return
      }
      resolve(updateType.rawValue)
    })
  }

  @objc
  func skipThisVersion() {
    guard let appStoreVersion = appStoreVersion else { return }
    UserDefaults.storedSkippedVersion = appStoreVersion
    UserDefaults.standard.synchronize()
  }

  @objc
  func launchAppStore() {
    guard let appId = appId,
          let url = URL(string: "https://itunes.apple.com/app/id\(appId)") else {
      return
    }

    DispatchQueue.main.async {
      UIApplication.shared.open(url, options: [:], completionHandler: nil)
    }
  }

  @objc
  func presentNextTime(_ day: Int) {
    let interval = TimeInterval(86400 * day)
    UserDefaults.alertPresentationDate = Date().addingTimeInterval(interval)
    UserDefaults.standard.synchronize()
  }

  @objc
  func computeDaysSincePresentation(
    _ resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock) {
      guard let alertPresentationDate = alertPresentationDate else {
        return
      }
      let daysSincePresentation = Date.days(since: alertPresentationDate)
      resolve(daysSincePresentation)
    }
}

extension NeoVersion {

  private func performVersionCheck(_ countryCode: String?) async -> UpdateType? {
    do {
      let response = try await RequestManager(countryCode).performVersionCheck()
      guard let updateType = await parse(response) else { return nil }
      return updateType
    } catch {
      return nil
    }
  }

  private func parse(_ response: Response) async -> UpdateType? {
    guard let results = response.results.first else { return nil }

    guard let minimumOSVersion = results.minimumOSVersion,
          DataParser.isUpdateCompatible(for: minimumOSVersion) else {
      return nil
    }

    if let appId = results.appId,
       let appStoreVersion = results.version {
      self.appId = appId
      self.appStoreVersion = appStoreVersion
    }

    guard DataParser.hasNewerVersion(currentVersion,
                                     appStoreVersion) else {
      return nil
    }

    guard let releaseDate = results.releaseDate,
          shouldUpdate(since: releaseDate) else {
      return nil
    }

    guard appStoreVersion != UserDefaults.storedSkippedVersion else {
      return nil
    }

    let updateType = DataParser.parseForUpdate(for: currentVersion, and: appStoreVersion)

    return updateType
  }
}

extension NeoVersion {

  //    Sometimes the iTunes JSON updates faster than the App Store CDN
  private func shouldUpdate(since releaseDate: String) -> Bool {
    guard let daysSinceRelease = Date.days(since: releaseDate),
          daysSinceRelease >= 1
    else {
      return false
    }

    return true
  }
}
