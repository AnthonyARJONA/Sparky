const axios = require('axios');

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

    async function getAccessToken() {
        try {
            
            let username = 'aarjona1'
            let password = ''

            const myges_credentials = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
            const  res = await axios({
                method: 'GET',
                url: 'https://authentication.reseau-ges.fr/oauth/authorize?response_type=token&client_id=skolae-app',
                headers: {
                    Authorization: `Basic ${myges_credentials}`
                },
                maxRedirects: 0
            })
            return null;
        } catch (e) {
            if (!e.request?.res?.headers?.location)  throw new Error('Bad password');
            
            const location = e.request.res.headers.location;
            const hash = location.slice(location.indexOf('#') + 1);
            const properties = hash.split('&')
                .map(property => property.split('='))
                .reduce((acc, [name, value]) => ({ ...acc, [name]: value }), {});
        
            /*return {
                access_token: properties.access_token,
                token_type: properties.token_type,
                expires_in: properties.expires_in,
                scope: properties.scope,
                uid: properties.uid,
            };*/
            console.log(properties)
        }
    }

    getAccessToken()

