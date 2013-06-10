//
//  DropboxPlugin.h
//  PhoneGapSync
//
//  Created by Christophe Coenraets on 5/18/13.
//
//

#import <Cordova/CDV.h>
#import "DropboxPlugin.h"


@interface DropboxPlugin : CDVPlugin

- (void) link:(CDVInvokedUrlCommand*)command;

- (void) checkLink:(CDVInvokedUrlCommand*)command;

- (void) unlink:(CDVInvokedUrlCommand*)command;

- (void)listFolder:(CDVInvokedUrlCommand*)command;

- (void)addObserver:(CDVInvokedUrlCommand*)command;

- (void)readData:(CDVInvokedUrlCommand*)command;

- (void)readString:(CDVInvokedUrlCommand*)command;


@end
