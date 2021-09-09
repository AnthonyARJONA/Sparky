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

module.exports = class Myges {}