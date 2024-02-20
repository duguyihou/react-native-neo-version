@objc(NeoVersion)
class NeoVersion: NSObject {

  private var country: String? {
    if #available(iOS 16, *) {
      return Locale.current.region?.identifier
    } else {
      return Locale.current.regionCode
    }
  }

  private var bundleIdentifier: String {
    return Bundle.main.infoDictionary?["CFBundleIdentifier"] as? String ?? ""
  }

  private var currentVersion: String {
    return Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? ""
  }

  private func fetchUpdateInfo(completion: @escaping ([String: Any]?, Error?) -> Void) throws -> URLSessionDataTask {
    guard let info = Bundle.main.infoDictionary,
          let identifier = info["CFBundleIdentifier"] as? String,
          let countryCode = country,
          let url = URL(string: "http://itunes.apple.com/\(countryCode)/lookup?bundleId=\(identifier)")
    else { throw VersionError.invalidBundleInfo }

    let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
      do {
        if let error = error { throw error }
        guard let data = data else { throw VersionError.invalidResponse }
        let json = try JSONSerialization.jsonObject(with: data, options: .fragmentsAllowed) as? [String: Any]
        guard let results = (json?["results"] as? [Any])?.first as? [String: Any],
              let latestVersion = results["version"] as? String,
              let releaseNotes = results["releaseNotes"] as? String
        else { throw VersionError.invalidResponse }
        let info = [
          "country": self.country ?? "",
          "currentVersion": self.currentVersion,
          "latestVersion": latestVersion,
          "isUpdateAvailable": latestVersion != self.currentVersion,
          "releaseNotes": releaseNotes
        ]
        print("🐵 --- info \(info)")
        completion(info, nil)
      } catch {
        completion(nil, error)
      }}
    task.resume()
    return task
  }

  @objc
  func getUpdateInfo(_ resolve: @escaping RCTPromiseResolveBlock,
                     reject: @escaping RCTPromiseRejectBlock) {
    let _ = try? fetchUpdateInfo { info, error in
      if let info = info {
        resolve(info)
      }
      if let error = error {
        reject("fetch update info failed", error.localizedDescription, error)
      }
    }
  }
}

enum VersionError: Error {
  case invalidBundleInfo
  case invalidResponse
}
