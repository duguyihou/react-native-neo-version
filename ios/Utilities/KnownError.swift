import Foundation

enum KnownError: LocalizedError {
  case dataRetrievalEmptyResults
  case dataRetrievalFailure
  case jsonParsingFailure(_ error: Error)
  case malformedURL
  case missingBundleID
  case noUpdateAvailable

  var localizedDescription: String {
    switch self {
    case .dataRetrievalEmptyResults:
      return "Results is empty."
    case .dataRetrievalFailure:
      return "Retrieve App Store data failed."
    case .jsonParsingFailure(let error):
      return "Parse App Store JSON data failed.\n Error -->\(error)"
    case .malformedURL:
      return "URL is malformed."
    case .missingBundleID:
      return "`Bundle Identifier` is missed."
    case .noUpdateAvailable:
      return "No new update available."
    }
  }
}
