/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.alliedpayment.picturepay;

import android.content.Intent;
import android.os.Bundle;
import org.apache.cordova.*;

public class MainActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getIntent();
        intent.putExtra("loadUrlTimeoutValue", 120000);
        // enable Cordova apps to be started in the background
        Bundle extras = intent.getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
        //Get url from some external source
        String ssoUrl = "https://billpay.demo.alliedpayment.com/BillPay/sso?IV=DYVVH3Yfm_knj4J0PrvKmg,,&ssoToken=G911Ukpo80ULwcgU4gnIDc2FILh3M-fXrTCDOjEozd_ykstsGP-Jc832kF0NnMNgOdBPeROrwbJc0stJdz-Z5Cav402vkRpV4syGqhdfd1gbU_dDUHPRQ8XJuyPdmB-fB0zCwQfzURc2GXjczpSX7g,,&signature=D217640A295080C0B3BFE824E2EDEC90551E2EDF";
        // launchUrl Set by <content src="index.html" /> in config.xml
        String launchUrlWithParameter = launchUrl + "?sso=" + ssoUrl;
        loadUrl(launchUrlWithParameter);
    }
}
