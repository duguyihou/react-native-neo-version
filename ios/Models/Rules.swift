import Foundation

struct Rules {
  let alertType: AlertType

  let frequency: Frequency

  init(prompt frequency: Frequency, for alertType: AlertType) {
    self.frequency = frequency
    self.alertType = alertType
  }

  static var critical: Rules {
    return Rules(prompt: .immediately, for: .force)
  }

  static var `default`: Rules {
    return Rules(prompt: .daily, for: .skip)
  }

  static var hinting: Rules {
    return Rules(prompt: .weekly, for: .option)
  }

  static var persistent: Rules {
    return Rules(prompt: .daily, for: .option)
  }

  static var relaxed: Rules {
    return Rules(prompt: .weekly, for: .skip)
  }
}

extension Rules {
  enum AlertType {
    case force
    case option
    case skip
    case none
  }

  enum Frequency: UInt {
    case immediately = 0
    case daily = 1
    case weekly = 7
  }

  enum UpdateType: String {
    case major
    case minor
    case patch
    case unknown
  }
}
