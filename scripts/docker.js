const cp = require('child_process');

const isWin = /^win/.test(process.platform); // eslint-disable-line

const imageName = process.argv[process.argv.length - 1];
const buildFlag = process.argv.includes('--build');
const startFlag = process.argv.includes('--start');
const stopFlag = process.argv.includes('--stop');
const cleanFlag = process.argv.includes('--clean');

const prependStr = prepend => str => prepend ? `${prepend}"${str}"` : str;

const platformCmd = prependStr(isWin ? 'powershell -NoProfile -Command ' : '');

if (['--build', '--start', '--stop'].some(cmd => cmd === imageName)) {
    console.error('\nUps! You should specify the image name as the last argument of the docker script.');
    process.exit(1); //eslint-disable-line
}

const buildCmd = platformCmd(`docker build -t ${imageName}:$(git rev-parse --short HEAD) .`);

const pipeStd = child => {
    child.stdout.on('data', data => console.log(data.toString()));
    child.stderr.on('data', data => console.error(data.toString()));
    return child;
};

const doBuild = () => {
    console.log('\n ## Build Task:', buildCmd, '\n');

    return new Promise(
        (res, rej) =>
        pipeStd(cp.exec(buildCmd)
            .on('error', err => rej(err))
            .on('close', code => !code ? res() : rej(code)))
    );
};

const startCmd = platformCmd(`docker run -p 8080:8080 -d ${imageName}:$(git rev-parse --short HEAD)`);

const doStart = () => {
    console.log('\n ## Start Task:', startCmd, '\n');

    return new Promise(
        (res, rej) =>
        pipeStd(cp.exec(startCmd)
            .on('error', err => rej(err))
            .on('close', code => !code ? res() : rej(code))
        )
    );
};

const queryImagesCmd = platformCmd(`docker ps -a -q --filter ancestor=${imageName}:$(git rev-parse --short HEAD) --format='{{.ID}}'`);
const queryImages = () => {
    console.log('\n ## Query Task:', queryImagesCmd, '\n');
    return new Promise(
        (res, rej) => {
            let buf = '';

            pipeStd(cp.exec(queryImagesCmd))
                .on('error', err => rej(err))
                .on('close', code => !code ? res(buf.replace(/\n/g, ' ').trim()) : rej(code))
                .stdout.on('data', data => {
                    buf = buf.concat(data.toString());
                });
        });
};

const stopCmd = images => platformCmd(`docker stop ${images}`);
const doStop = query => {
    return query.then(images => {
        if (images === '') {
            return Promise.resolve('No containers to stop');
        }

        console.log('\n ## Stop Task:', stopCmd(images), '\n');
        return new Promise(
            (res, rej) =>
            pipeStd(cp.exec(stopCmd(images))
                .on('error', err => rej(err))
                .on('close', code => !code ? res() : rej(code)))
        );
    });
};

const cleanCmd = images => platformCmd(`docker rm ${images}`);
const doClean = query => {
    return query.then(images => {
        if (images === '') {
            return Promise.resolve('No containers to clean');
        }

        console.log('\n ## Clean Task:', cleanCmd(images), '\n');
        return new Promise(
            (res, rej) =>
            pipeStd(cp.exec(stopCmd(images))
                .on('error', err => rej(err))
                .on('close', code => !code ? res() : rej(code)))
        );
    });
};

const build = buildFlag ? doBuild() : Promise.resolve('\n -- skipping build');

build.then((msg = '\n # done building!') => console.log(msg));

const start = build.then(() => startFlag ? doStart() : Promise.resolve('\n -- skipping start'));

start.then((msg = '\n # done starting!') => console.log(msg));

const query = start.then(() => stopFlag ? queryImages() :
    cleanFlag ? queryImages() : Promise.resolve(''));
const stop = start.then(() => stopFlag ? doStop(query) : Promise.resolve('\n -- skipping stop'));

stop.then((msg = '\n # done stoping!') => console.log(msg));

const clean = stop.then(() => cleanFlag ? doClean(query) : Promise.resolve('\n -- skipping clean'));

clean.then((msg = '\n # done cleaning!') => console.log(msg))
    .then(() => console.log('\n ## all done!'))
    .catch(() => { console.error('\n ## check the errors above.'); process.exit(1) }); //eslint-disable-line
