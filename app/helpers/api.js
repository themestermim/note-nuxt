export const getFetchRequest = (api, header) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const mergedOptions = {
        ...headers,
        ...header,
    };
    return new Promise((resolve, reject) => {
        $fetch(`${useRuntimeConfig().public.apiBase}/${api}`, {
            method: 'Get',
            headers: mergedOptions,
            timeout: 3000,
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const getFetchRequestSSR = (api, header) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const mergedOptions = {
        ...headers,
        ...header,
    };
    return new Promise((resolve, reject) => {
        useFetch(`${useRuntimeConfig().public.apiBase}/${api}`, {
            method: 'Get',
            headers: mergedOptions,
            timeout: 3000,
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
};

export const postFetchRequest = (url, header, options) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const mergedOptions = {
        ...headers,
        ...header,
    };
    return new Promise((resolve, reject) => {
        $fetch(`${useRuntimeConfig().public.apiBase}/${url}`, {
            method: 'Post',
            headers: mergedOptions,
            body: options,
            timeout: 15000,
        }).then(response => {
            resolve(response);
        }).catch(error => {
            if (error?.message?.includes("TimeoutError")) {
                reject({
                    status: 408,
                    message: "اینترنت خود را بررسی کنید",
                });
            } else {
                reject(error.response);
            }
        });
    });
};

export const postFetchRequestSSR = (url, header, options) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const mergedOptions = {
        ...headers,
        ...header,
    };
    return new Promise((resolve, reject) => {
        useFetch(`${useRuntimeConfig().public.apiBase}/${url}`, {
            method: 'Post',
            headers: mergedOptions,
            body: options,
            timeout: 15000,
        }).then(response => {
            resolve(response);
        }).catch(error => {
            if (error?.message?.includes("TimeoutError")) {
                reject({
                    status: 408,
                    message: "اینترنت خود را بررسی کنید",
                });
            } else {
                reject(error.response);
            }
        });
    });
};