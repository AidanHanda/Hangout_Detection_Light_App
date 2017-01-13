var isInitialized = false; //This variable is to make sure that the first time they open their chromebook after it boots up, the light is initialized.
const COMPANION_APP_EXTENSION_ID = "kckgfiaahinoeolaomjicclakgolhikb";
var lightState = false;
function initialize() {

    //All the possible colors that the light can change to (black means off)
    var colors = ['white', 'black', 'blue', 'red', 'green', 'yellow', 'cyan',
        'magenta'
    ];

    dell.led.initialize(); //Init function

    //Makes sure the light is on every 300 milliseconds
    setTimeout(function() {
        dell.led.turnOn();
    }, 300);
}
var off = false;
function doStrobe() {
    if (lightState) {
        switch (off) {
            case true:
                dell.led.changeColor("green");
                off = false;
                break;
            case false:
                dell.led.changeColor("black");
                off = true;
                break;
        }
    }
    setTimeout(doStrobe, 500);
}
doStrobe();

chrome.runtime.onMessageExternal.addListener(

    function(request, sender, sendResponse) {

        if (sender.id != COMPANION_APP_EXTENSION_ID) { //Add room for possible blacklists should someone try to send this extension fake offs
            // don't allow this extension access
            console.log("Illegal Access");
        }
        else if (request.light_state) { //If the message is sending the light state in the on position react to it
            if (!isInitialized) { //If our light has not been initialized yet run the initialisation
                console.log("Initialized.");
                initialize();
                isInitialized = true;
            }

            console.log("Recieved " + request.light_state); //Log to the console for debugging/testing purposes

            lightState = true;

        }
        else if (!request.light_state) { //If the extension is sending the light state in the off position
            if (!isInitialized) { //Do the initialisation for the light if it hasnt been initialized.
                console.log("Initialized.");
                initialize();
                isInitialized = true;
            }

            console.log("Recieved " + request.light_state); //Log to the console
            lightState = false;

        }
    });


//Below is the API for the DELL CHROMEBOOK LIGHT, only used for controlling the light

//For the following code, the license below applies.
/*
 Apache License
 Version 2.0, January 2004
 http://www.apache.org/licenses/

 TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

 1. Definitions.

 "License" shall mean the terms and conditions for use, reproduction,
 and distribution as defined by Sections 1 through 9 of this document.

 "Licensor" shall mean the copyright owner or entity authorized by
 the copyright owner that is granting the License.

 "Legal Entity" shall mean the union of the acting entity and all
 other entities that control, are controlled by, or are under common
 control with that entity. For the purposes of this definition,
 "control" means (i) the power, direct or indirect, to cause the
 direction or management of such entity, whether by contract or
 otherwise, or (ii) ownership of fifty percent (50%) or more of the
 outstanding shares, or (iii) beneficial ownership of such entity.

 "You" (or "Your") shall mean an individual or Legal Entity
 exercising permissions granted by this License.

 "Source" form shall mean the preferred form for making modifications,
 including but not limited to software source code, documentation
 source, and configuration files.

 "Object" form shall mean any form resulting from mechanical
 transformation or translation of a Source form, including but
 not limited to compiled object code, generated documentation,
 and conversions to other media types.

 "Work" shall mean the work of authorship, whether in Source or
 Object form, made available under the License, as indicated by a
 copyright notice that is included in or attached to the work
 (an example is provided in the Appendix below).

 "Derivative Works" shall mean any work, whether in Source or Object
 form, that is based on (or derived from) the Work and for which the
 editorial revisions, annotations, elaborations, or other modifications
 represent, as a whole, an original work of authorship. For the purposes
 of this License, Derivative Works shall not include works that remain
 separable from, or merely link (or bind by name) to the interfaces of,
 the Work and Derivative Works thereof.

 "Contribution" shall mean any work of authorship, including
 the original version of the Work and any modifications or additions
 to that Work or Derivative Works thereof, that is intentionally
 submitted to Licensor for inclusion in the Work by the copyright owner
 or by an individual or Legal Entity authorized to submit on behalf of
 the copyright owner. For the purposes of this definition, "submitted"
 means any form of electronic, verbal, or written communication sent
 to the Licensor or its representatives, including but not limited to
 communication on electronic mailing lists, source code control systems,
 and issue tracking systems that are managed by, or on behalf of, the
 Licensor for the purpose of discussing and improving the Work, but
 excluding communication that is conspicuously marked or otherwise
 designated in writing by the copyright owner as "Not a Contribution."

 "Contributor" shall mean Licensor and any individual or Legal Entity
 on behalf of whom a Contribution has been received by Licensor and
 subsequently incorporated within the Work.

 2. Grant of Copyright License. Subject to the terms and conditions of
 this License, each Contributor hereby grants to You a perpetual,
 worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 copyright license to reproduce, prepare Derivative Works of,
 publicly display, publicly perform, sublicense, and distribute the
 Work and such Derivative Works in Source or Object form.

 3. Grant of Patent License. Subject to the terms and conditions of
 this License, each Contributor hereby grants to You a perpetual,
 worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 (except as stated in this section) patent license to make, have made,
 use, offer to sell, sell, import, and otherwise transfer the Work,
 where such license applies only to those patent claims licensable
 by such Contributor that are necessarily infringed by their
 Contribution(s) alone or by combination of their Contribution(s)
 with the Work to which such Contribution(s) was submitted. If You
 institute patent litigation against any entity (including a
 cross-claim or counterclaim in a lawsuit) alleging that the Work
 or a Contribution incorporated within the Work constitutes direct
 or contributory patent infringement, then any patent licenses
 granted to You under this License for that Work shall terminate
 as of the date such litigation is filed.

 4. Redistribution. You may reproduce and distribute copies of the
 Work or Derivative Works thereof in any medium, with or without
 modifications, and in Source or Object form, provided that You
 meet the following conditions:

 (a) You must give any other recipients of the Work or
 Derivative Works a copy of this License; and

 (b) You must cause any modified files to carry prominent notices
 stating that You changed the files; and

 (c) You must retain, in the Source form of any Derivative Works
 that You distribute, all copyright, patent, trademark, and
 attribution notices from the Source form of the Work,
 excluding those notices that do not pertain to any part of
 the Derivative Works; and

 (d) If the Work includes a "NOTICE" text file as part of its
 distribution, then any Derivative Works that You distribute must
 include a readable copy of the attribution notices contained
 within such NOTICE file, excluding those notices that do not
 pertain to any part of the Derivative Works, in at least one
 of the following places: within a NOTICE text file distributed
 as part of the Derivative Works; within the Source form or
 documentation, if provided along with the Derivative Works; or,
 within a display generated by the Derivative Works, if and
 wherever such third-party notices normally appear. The contents
 of the NOTICE file are for informational purposes only and
 do not modify the License. You may add Your own attribution
 notices within Derivative Works that You distribute, alongside
 or as an addendum to the NOTICE text from the Work, provided
 that such additional attribution notices cannot be construed
 as modifying the License.

 You may add Your own copyright statement to Your modifications and
 may provide additional or different license terms and conditions
 for use, reproduction, or distribution of Your modifications, or
 for any such Derivative Works as a whole, provided Your use,
 reproduction, and distribution of the Work otherwise complies with
 the conditions stated in this License.

 5. Submission of Contributions. Unless You explicitly state otherwise,
 any Contribution intentionally submitted for inclusion in the Work
 by You to the Licensor shall be under the terms and conditions of
 this License, without any additional terms or conditions.
 Notwithstanding the above, nothing herein shall supersede or modify
 the terms of any separate license agreement you may have executed
 with Licensor regarding such Contributions.

 6. Trademarks. This License does not grant permission to use the trade
 names, trademarks, service marks, or product names of the Licensor,
 except as required for reasonable and customary use in describing the
 origin of the Work and reproducing the content of the NOTICE file.

 7. Disclaimer of Warranty. Unless required by applicable law or
 agreed to in writing, Licensor provides the Work (and each
 Contributor provides its Contributions) on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 implied, including, without limitation, any warranties or conditions
 of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
 PARTICULAR PURPOSE. You are solely responsible for determining the
 appropriateness of using or redistributing the Work and assume any
 risks associated with Your exercise of permissions under this License.

 8. Limitation of Liability. In no event and under no legal theory,
 whether in tort (including negligence), contract, or otherwise,
 unless required by applicable law (such as deliberate and grossly
 negligent acts) or agreed to in writing, shall any Contributor be
 liable to You for damages, including any direct, indirect, special,
 incidental, or consequential damages of any character arising as a
 result of this License or out of the use or inability to use the
 Work (including but not limited to damages for loss of goodwill,
 work stoppage, computer failure or malfunction, or any and all
 other commercial damages or losses), even if such Contributor
 has been advised of the possibility of such damages.

 9. Accepting Warranty or Additional Liability. While redistributing
 the Work or Derivative Works thereof, You may choose to offer,
 and charge a fee for, acceptance of support, warranty, indemnity,
 or other liability obligations and/or rights consistent with this
 License. However, in accepting such obligations, You may act only
 on Your own behalf and on Your sole responsibility, not on behalf
 of any other Contributor, and only if You agree to indemnify,
 defend, and hold each Contributor harmless for any liability
 incurred by, or claims asserted against, such Contributor by reason
 of your accepting any such warranty or additional liability.

 END OF TERMS AND CONDITIONS

 APPENDIX: How to apply the Apache License to your work.

 To apply the Apache License to your work, attach the following
 boilerplate notice, with the fields enclosed by brackets "{}"
 replaced with your own identifying information. (Don't include
 the brackets!)  The text should be enclosed in the appropriate
 comment syntax for the file format. We also recommend that a
 file or class name and description of purpose be included on the
 same "printed page" as the copyright notice for easier
 identification within third-party archives.

 Copyright Dell Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */

//Dell Led JS
'use strict';
/*
 * High level object used to expose Simulator features through a Javascript API.
 */
(function(exports) {

    var logger = exports.logger || {};
    logger.currentLogLevel = 'warn';
    logger.log = function(level, msg) {
        if (level === this.currentLogLevel) {
            var now = new Date();
            console.log('[' + now + '][' + level.toUpperCase() + '] ' + msg);
        }
    };

    exports.logger = logger;

    var dell;
    if (exports.dell === undefined) {
        dell = {};
    } else {
        dell = exports.dell;
    }
    /*
     * LED related methods. Users of the API shoudl access this object
     * in order to manipulate the LED, like changing colors, turning it on and off
     * or blinking it or not.
     */
    dell.led = {};
    dell.led.connectionId = null;
    dell.led.deviceId = null;
    dell.led.HID_VENDOR_ID = 0x04D8;
    dell.led.HID_PRODUCT_ID_1 = 0x0B28;
    dell.led.HID_PRODUCT_ID_2 = 0x0100;
    dell.led.DEVICE_INFO = [{
        "vendorId": dell.led.HID_VENDOR_ID,
        "productId": dell.led.HID_PRODUCT_ID_1
    },
        {
            "vendorId": dell.led.HID_VENDOR_ID,
            "productId": dell.led.HID_PRODUCT_ID_2
        },
    ];
    dell.led.COMMAND_SIZE = 64;
    dell.led.LED_STOP_TIME = 30; // 30 * 50ms = 1 sec
    dell.led.HEARBEAT_INTERVAL = 500; // 500 ms
    exports.heartBeatInterval = null; // interval object

    /*
     * Initializes the HID device by creating a connection to it, which will be used
     * to send and read commands to it.
     * Must be called once before any command can be sent to the device.
     */
    dell.led.initialize = function(postInitialize, onAfterConnectionSuccess) {


        if (window.chrome === undefined) {
            logger.log('debug', 'null windows');
            return;
        }

        // Try to open the USB HID device
        dell.led._connectDevice(dell.led.DEVICE_INFO[0], postInitialize, onAfterConnectionSuccess);
        dell.led._connectDevice(dell.led.DEVICE_INFO[1], postInitialize, onAfterConnectionSuccess);
    };

    /*
     * connect to specific device, NOTE!, it will overwrite existing connectionId.
     */
    dell.led._connectDevice = function(deviceInfo, postInitialize, onAfterConnectionSuccess) {
        logger.log('debug', 'connecting device: ' + dell.led.HID_VENDOR_ID +
            ':' + dell.led.HID_PRODUCT_ID);

        chrome.hid.getDevices(deviceInfo, function(devices){
            if (!devices || !devices.length) {
                logger.log('debug', 'device not found');
                return;
            }

            logger.log('debug', 'Found device: ' + devices[0].deviceId);
            dell.led.deviceId = devices[0].deviceId;

            // Connect to the HID device
            chrome.hid.connect(dell.led.deviceId, function(connection){
                if (chrome.runtime.lastError) {
                    logger.log('debug', 'connection error:' + chrome.runtime.lastError
                            .message);
                    return;
                }

                logger.log('debug', 'Connected to the HID device!');
                dell.led.connectionId = connection.connectionId;

                // post Initialize the usb
                if (postInitialize !== null && postInitialize !== undefined) {
                    postInitialize();
                } else {
                    dell.led._postInitialize();
                }

                // Poll the USB HID Interrupt pipe
                if (onAfterConnectionSuccess != null) {
                    onAfterConnectionSuccess();
                }
            });
        });
    };

    /*
     * callback to handle device connection
     */
    dell.led._getDeviceCallBack = function(devices) {
    };

    /*
     * Creates a command data array to be used with '_sendCommand' method. It receives as
     * a parameter the color name and translates it to the correct code, so the HID device can
     * understand.
     */
    dell.led._createCommandDataForColor = function(colorName) {
        var commandData = new Uint8Array(dell.led.COMMAND_SIZE);
        for (var i = 0; i < dell.led.COMMAND_SIZE; i++) {
            commandData[i] = 0xff;
        }

        commandData[0] = 0x11; // command of color

        switch (colorName) {
            case 'black':
                commandData[1] = 0x08;
                break;
            case 'white':
                commandData[1] = 0x07;
                break;
            case 'red':
                commandData[1] = 0x01;
                break;
            case 'green':
                commandData[1] = 0x02;
                break;
            case 'blue':
                commandData[1] = 0x03;
                break;
            case 'yellow':
                commandData[1] = 0x04;
                break;
            case 'cyan':
                commandData[1] = 0x06;
                break;
            case 'magenta':
                commandData[1] = 0x05;
                break;
        }

        return commandData;
    };

    /*
     * Send command to the HID device.
     */
    dell.led._sendCommandToHIDDevice = function(commandData) {
        if (dell.led.connectionId === null) {
            logger.log('debug', 'invalid connectionId');
            return;
        }

        commandData[3] = dell.led._random(); //add random for security reason
        commandData[2] = dell.led._calculateCheckSum(commandData[0],
            commandData[1], commandData[3]); // add checksum

        chrome.hid.send(dell.led.connectionId, 0, commandData.buffer, function() {
            if (chrome.runtime.lastError) {
                logger.log('debug', 'Unable to set feature report: ' + chrome.runtime
                        .lastError.message);
            }
        });
    };

    /*
     * Create checksum for the commands
     */
    dell.led._random = function() {
        var random = (Math.random() * 256) % 255;
        return random;
    };

    /*
     * Create checksum for the commands
     */
    dell.led._calculateCheckSum = function(byte0, byte1, byte3) {
        var checksum = (21 * byte0 * byte0 + 19 * byte1 - 3 * byte3) % 255;
        return checksum;
    };


    /*
     * Keeps track of the last selected color set for the LED.
     */
    dell.led._lastSelectedColor = null;
    dell.led._isOn = false;

    /*
     * Collection of the possible colors that the LED can be set to.
     * For now it uses HTML color names but in the future it could use
     * color codes of any type, since it makes sense to the LED hardware.
     */
    dell.led.colors = {
        WHITE: 'white',
        RED: 'red',
        GREEN: 'green',
        BLUE: 'blue',
        YELLOW: 'yellow',
        CYAN: 'cyan',
        MAGENTA: 'magenta',
        BLACK: 'black'
    };

    /*
     * Indicates if the LED is turned on or off.
     */
    dell.led.isOn = function() {
        return this._isOn === true;
    };

    /*
     * to turn off the LED by default in postInitialize
     */
    dell.led._postInitialize = function() {
        var commandData = dell.led._createCommandDataForColor('black');
        dell.led._sendCommandToHIDDevice(commandData);
        dell.led._setOnStopTimeout();
    };

    /*
     * Turns the LED on if it is connected to the device.
     * Also opens the LED screen which show the user what color the LED is showing at the moment.
     */
    dell.led.turnOn = function() {
        if (window.chrome === undefined) {
            return;
        }
        //try to connect to the HID device
        if (dell.led.connectionId === null) {
            dell.led.initialize(dell.led._postInitialize, null);
        }
        dell.led._isOn = true;
    };

    /*
     * Turns the LED off if it is connected to the device.
     * Also closes the LED screen.
     */
    dell.led.turnOff = function() {
        dell.led.changeColor(this.colors.BLACK);
        dell.led._stopOnHeartBeat();
        dell.led._isOn = false;
    };

    /*
     * Turns off the LED when the application is suspended.
     */
    dell.led.turnOffOnSuspend = function() {
        if (dell !== undefined && dell.led.isOn() === false) {
            dell.led.initialize(function() {
                dell.led.turnOff();
            }, null);
        } else {
            dell.led.turnOff();
        }
    };

    /*
     * Exits the LED controller Chrome App.
     * If the LED is connected to the device, it turns the off and also
     * closes the LED screen and the color panel screen.
     */
    dell.led.exit = function() {
        if (dell.led.isOn() === true) {
            dell.led.turnOff();
        }

        if (chrome.app && chrome.app.window !== undefined) {
            var mainWindow = chrome.app.window.get('led-control-app');
            if (mainWindow !== undefined && mainWindow !== null) {
                mainWindow.close();
            }
        }
    };

    /*
     * Set LED stop time, with times of 50ms
     */
    dell.led._setOnStopTimeout = function() {
        var commandData = new Uint8Array(dell.led.COMMAND_SIZE);
        for (var i = 0; i < dell.led.COMMAND_SIZE; i++) {
            commandData[i] = 0xff;
        }
        commandData[0] = 0x25;
        commandData[1] = dell.led.LED_STOP_TIME;

        dell.led._sendCommandToHIDDevice(commandData);
    };

    /*
     * Start Heart Beat with LED, to ensure it's always on.
     */
    dell.led._startOnHeartBeat = function() {
        if (dell.led.connectionId == null) {
            logger.log('debug', 'init retry');
            dell.led.initialize(dell.led._postInitialize, null);
            setTimeout(function() {
                if (dell.led._lastSelectedColor != null) {
                    var commandData = dell.led._createCommandDataForColor(dell.led
                        ._lastSelectedColor);
                    dell.led._sendCommandToHIDDevice(commandData);
                }
            }, 200);
        }

        if (heartBeatInterval != null) {
            clearInterval(heartBeatInterval);
            heartBeatInterval = null;
        }

        heartBeatInterval = setInterval(function() {
            if (dell.led._lastSelectedColor != null) {
                var commandData = dell.led._createCommandDataForColor(dell.led._lastSelectedColor);
                dell.led._sendCommandToHIDDevice(commandData);
            }
        }, dell.led.HEARBEAT_INTERVAL);

    };

    /*
     * Stop Heart Beat with LED, so that LED will off
     */
    dell.led._stopOnHeartBeat = function() {
        if (heartBeatInterval != null) {
            clearInterval(heartBeatInterval);
            heartBeatInterval = null;
        }
    };

    /*
     * Changes the LED color by setting the received color code as the current color.
     */
    dell.led.changeColor = function(color) {
        var colorValues = [];
        for (var key in dell.led.colors) {
            colorValues.push(dell.led.colors[key]);
        }
        if (colorValues.indexOf(color) == -1) {
            throw 'Invalid color';
        }
        if (this.isOn() === true) {
            this._lastSelectedColor = color;
            var commandData = this._createCommandDataForColor(color);
            this._sendCommandToHIDDevice(commandData);
            dell.led._startOnHeartBeat();
        }
    };

    exports.dell = dell;
})(window);
