import Foundation

struct Response: Decodable {
  private enum CodingKeys: String, CodingKey {
    case results
  }

  let results: [Results]

  struct Results: Decodable {
    private enum CodingKeys: String, CodingKey {
      case appId = "trackId"
      case releaseDate = "currentVersionReleaseDate"
      case minimumOSVersion = "minimumOsVersion"
      case releaseNotes
      case version
    }
    
    let appId: Int?

    let releaseDate: String?

    let minimumOSVersion: String?

    let releaseNotes: String?

    let version: String?
  }
}
