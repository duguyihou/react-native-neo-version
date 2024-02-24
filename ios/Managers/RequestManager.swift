import Foundation

struct RequestManager {
  private struct Constants {
    static let bundleID = "bundleId"
    static let country = "country"
    static let language = "lang"
  }

  let bundleID: String?
  let country: Country
  let language: String?

  init(country: Country = .unitedStates,
       language: String? = nil,
       bundleID: String? = Bundle.main.bundleIdentifier) {
    self.country = country
    self.language = language
    self.bundleID = bundleID
  }

  static let shared = RequestManager()
}

extension RequestManager {
  init(_ countryCode: String?) {
    self.init(country: .init(code: countryCode))
  }

  func performVersionCheck() async throws -> Response {
    guard bundleID != nil else {
      throw KnownError.missingBundleID
    }

    do {
      let url = try composeURL()
      //      let url = URL(string: "https://itunes.apple.com/lookup?bundleId=com.facebook.Facebook&country=AU")
      let request = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalAndRemoteCacheData)
      let (data, _) = try await URLSession.shared.data(for: request)
      return try check(data)
    } catch {
      throw error
    }
  }

  private func composeURL() throws -> URL {
    var components = URLComponents()
    components.scheme = "https"
    components.host = "itunes.apple.com"
    components.path = "/lookup"

    var items: [URLQueryItem] = [URLQueryItem(name: Constants.bundleID, value: bundleID)]

    if let countryCode = country.code {
      let item = URLQueryItem(name: Constants.country, value: countryCode)
      items.append(item)
    }

    if let language = language {
      let item = URLQueryItem(name: Constants.language, value: language)
      items.append(item)
    }

    components.queryItems = items

    guard let url = components.url, !url.absoluteString.isEmpty else {
      throw KnownError.malformedURL
    }

    return url
  }

  private func check(_ data: Data?) throws -> Response {
    guard let data = data else {
      throw KnownError.dataRetrievalFailure
    }
    do {
      let model = try JSONDecoder().decode(Response.self, from: data)
      guard !model.results.isEmpty else {
        throw KnownError.dataRetrievalEmptyResults
      }

      return model
    } catch {
      throw KnownError.jsonParsingFailure(error)
    }
  }
}
