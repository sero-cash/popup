const webworker = new Worker('./data.worker.js', {type: 'module'});

export {
     webworker
}