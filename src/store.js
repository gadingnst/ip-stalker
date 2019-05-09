import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    ipInfo: {}
  }),
  mutations: {
    setIpInfo(state, data) {
      console.log(data)
      state.ipInfo = {
        type: {
          label: 'Type',
          value: data.type
        },
        flag: {
          label: 'Flag',
          value: data.emoji_flag
        },
        countryName: {
          label: 'Country Name',
          value: data.country_name
        },
        countryCode: {
          label: 'Country Code',
          value: data.country_code
        },
        language: {
          label: 'Language',
          value: data.location.languages[0].native
        },
        continent: {
          label: 'Continent',
          value: data.continent_name
        },
        latitude: {
          label: 'Latitude',
          value: data.latitude
        },
        longitude: {
          label: 'Longitude',
          value: data.longitude
        },
        callingCode: {
          label: 'Calling Code',
          value: data.location.calling_code
        },
        mobile: {
          label: 'Mobile Device',
          value: data.mobile
        },
        timezone: {
          label: 'Timezone',
          value: data.timezone
        },
        timezoneGMT: {
          label: 'Timezone GMT',
          value: data.timezone_gmt
        },
        city: {
          label: 'City',
          value: data.city
        },
        region: {
          label: 'Region',
          value: data.region
        },
        currencyCode: {
          label: 'Currency Code',
          value: data.currency_code
        },
        currencySym: {
          label: 'Currency Symbol',
          value: data.currency_symbol
        },
        isp: {
          label: 'ISP',
          value: data.isp
        },
        timezoneAbbr: {
          label: 'Timezone Abbr',
          value: data.time_zone.abbr
        },
        organisation: {
          label: 'Organisation',
          value: data.organisation
        },
        tor: {
          label: 'TOR',
          value: data.threat.is_tor
        },
        proxy: {
          label: 'Proxy',
          value: data.threat.is_proxy
        },
        count: {
          label: 'Total Searching',
          value: data.count
        }
      }
    }
  }
})
