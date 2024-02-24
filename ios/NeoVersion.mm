#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NeoVersion, NSObject)

RCT_EXTERN_METHOD(getVersionInfo:
                  (NSString*)countryCode
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(computeDaysSincePresentation:
                  (RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(skipThisVersion)
RCT_EXTERN_METHOD(launchAppStore)
RCT_EXTERN_METHOD(presentNextTime:(NSInteger*)day)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
