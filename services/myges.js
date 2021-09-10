const axios = require('axios');
const Logger = require('../services/logger')

const endpoint = {
    'base': 'https://services.reseau-ges.fr',
    'agenda': '/agenda',
    'profile': '/profile',
    'news': '/news',
    'banners': '/news/banners',
    'grades': '/{year}/grades',
    'absences': '/{year}/absences',
    'teachers': '/{year}/teachers',
    'classes': '/classes/{classeId}/students',
    'student': '/students/{studentId}',
}

module.exports = class Myges {

    async getAccessToken() {
        try {
            
            let username = 'aarjona1'
            let password = 'cQDnnJX3'

            const myges_credentials = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
            const res = await axios({
                method: 'GET',
                url: 'https://authentication.reseau-ges.fr/oauth/authorize?response_type=token&client_id=skolae-app',
                headers: {
                    Authorization: `Basic ${myges_credentials}`
                },
                maxRedirects: 0
            })
            return null;
        } catch (err) {
            if (!err.request?.res?.headers?.location) {
                Logger.log('Bad password', 'warning');
                return;
            }
            
            const location = err.request.res.headers.location;
            const hash = location.slice(location.indexOf('#') + 1);
            const properties = hash.split('&')
                .map(property => property.split('='))
                .reduce((acc, [name, value]) => ({ ...acc, [name]: value }), {});
        
            return properties;
            
            /*return {
                access_token: properties.access_token,
                token_type: properties.token_type,
                expires_in: properties.expires_in,
                scope: properties.scope,
                uid: properties.uid,
            };*/         
        }
    }

    async getProfile() {
        //this.getAccessToken().then(async (props) => {
            try {
                const res = await axios({
                    method: 'POST',
                    url: 'https://services.reseau-ges.fr/news/banners', //endpoint.base + endpoint.agenda,
                    headers: {
                        Authorization: 'Bearer: ' + 'cf6e1369-97fb-40c9-a6d6-442b6e810f31'
                    },
                })
                console.log(res)
            } catch(err) {
                console.log(err)
            }
            //console.log(props)
        //})
    }


}