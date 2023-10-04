<template>
  <div></div>
</template>

<script>
/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
*  SPDX-License-Identifier: MIT-0
*/

// const ridesTopic = 'theme-park-rides'
// const { IoTDataPlaneClient, GetRetainedMessageCommand } = require("@aws-sdk/client-iot-data-plane");
const { CognitoIdentityClient} = require("@aws-sdk/client-cognito-identity")
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-providers")

export default {
  name: 'IoT',
  data() {
    return {
      init: false
    }
  },
    mounted: async function () {
      // For the workshop, if this isn't in the config, the user has not
      // attemped this module yet, so hide the feature.

      if (this.$appConfig.iot.poolId === '') return
     //const AWSConfiguration = this.$appConfig.iot

      try{
        const cognitoidentity = new CognitoIdentityClient({
          credentials : fromCognitoIdentityPool({
            client : new CognitoIdentityClient({region: 'eu-west-1'}),
            identityPoolId : 'eu-west-1:5ed89223-5b11-4a7c-a41e-560b89fc05b5'
          }),
        });
        const credentials = await cognitoidentity.config.credentials()
        console.log(credentials)

      } catch (err) {
        console.error('iot error:', err)
      }

      // const iotClient = new IoTDataPlaneClient({
      //   region: AWSConfiguration.region,
      //   credentials: fromCognitoIdentityPool({
      //     region: AWSConfiguration.region,
      //     client: client,
      //     identityPoolId: AWSConfiguration.poolId,
      //   }),
      // });
      // console.log('credentials', iotClient)

      // console.log('IoT mounted')
      // const _store = this.$store
      //
      // try {
      //   const payload = await iotClient.send(new GetRetainedMessageCommand({
      //     topic: ridesTopic
      //   }));
      //   const payloadEnvelope = JSON.parse(payload.toString())
      //   console.log('Message: ', payloadEnvelope)
      //   if (payloadEnvelope.type === 'alert') {
      //     _store.commit('setParkAlert', JSON.parse(payloadEnvelope.msg))
      //   }
      //   if (payloadEnvelope.type === 'photoProcessed') {
      //     console.log('Photo processed: ', payloadEnvelope.message.URL)
      //     _store.commit('addPhoto', payloadEnvelope.message.URL)
      //     _store.commit('setParkAlert', {
      //       title: 'Photo processed',
      //       type: 'info',
      //       confirmButtonText: 'OK'
      //     })
      //   }
      //   // ride updates use the ridesTopic
      //   if (payloadEnvelope.type === 'summary') {
      //     _store.commit('updateRideTimes', payloadEnvelope.msg)
      //   }
      // } catch (err) {
      //   console.error('iot error:', err)
      // }
    }
}

</script>
