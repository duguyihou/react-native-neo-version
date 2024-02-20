#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NeoVersion, NSObject)

RCT_EXTERN_METHOD(getUpdateInfo:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
