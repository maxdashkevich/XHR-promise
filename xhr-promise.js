import XMLHttpRequest from "xmlhttprequest";

export function xhrRequest(options) {
    const xhrPromise = new Promise((resolve, reject) => {
        if (!options.method || !options.url) {
            reject('Not enough options');
        }

        if (!options.body) {
            options.body = '';
        }
        const xhr = new XMLHttpRequest();

        xhr.open(options.method, options.url);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            
            if (xhr.status === 200) {
                resolve(xhr);
            } else {
                reject({
                    'status': xhr.status,
                    'statusText': xhr.statusText
                });
            }
        };

        xhr.onerror = function() {
            reject({
                'status': xhr.status,
                'statusText': xhr.statusText
            });
        };
        
        if (!options.responseType) {
            xhr.responseType = 'json';
        } else {
            xhr.responseType = options.responseType;
        }

        xhr.send(options.body)
    });

    return xhrPromise;
}