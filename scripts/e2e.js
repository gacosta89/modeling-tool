const path = require('path');
const fs = require('fs');
const config = require('config');
const selenium = require('selenium-standalone');
const cp = require('child_process');
const npmWhich = require('npm-which');
const mkdirp = require('mkdirp');

const reports = config.get('test.folders.reports');

const seleniumInstall = new Promise((res, rej) => {
    selenium.install({
        logger: message => console.log(message),
    }, err => err ? rej(err) : res());
});

const seleniumStart = seleniumInstall.then(() => new Promise((res, rej) => {
    selenium.start({
        seleniumArgs: ['-debug'],
    }, (err, seleniumChild) => err ? rej(err) : res(seleniumChild));
}));

seleniumStart.then(child => {
        mkdirp.sync(reports);
        const seleniumLog = fs.createWriteStream(path.join(reports, 'selenium.log'));

        child.stdout.pipe(seleniumLog);
        child.stderr.pipe(seleniumLog);

        process.on('uncaughtException', err2 => {
            console.error(err2.stack);
            child.kill('SIGINT');
            process.exit(1); // eslint-disable-line
        });

        return child;
    })
    .then(child => {
        const which = npmWhich(__dirname);
        const nightwatchRunner = which.sync('nightwatch');

        const args = [
            '--output', reports
        ];

        cp.spawn(nightwatchRunner, args, {
                stdio: 'inherit'
            })
            .on('error', err2 => {
                console.error(err2.stack);
                process.exit(1); // eslint-disable-line
            })
            .on('close', code => {
                child.kill('SIGINT');
                process.exit(code); // eslint-disable-line
            });
    }).catch(err => console.error(err.stack));
