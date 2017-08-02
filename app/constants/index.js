const getHost = () => {
    const host = document.domain.toLowerCase();
    if (host.indexOf('example') !== -1){
        return '//' + document.domain + (location.port ? ':' + location.port : '');
    } else {
        return ''
    }
}

export const host = getHost()

export const api_login = host + ''
