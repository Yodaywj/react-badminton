export const ROOT_URL = process.env.NODE_ENV === 'production' ?
    `https://${window.location.hostname}:8080` // 生产环境的请求地址
    : 'http://localhost:8080';

export const heightOfHF = 152;

export const tableScroll = {
    x: 600,
}