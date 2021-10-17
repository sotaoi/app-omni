const fs = require('fs');
const path = require('path');
const { Helper } = require('@sotaoi/omni/helper');
const { execSync } = require('child_process');

const buildAomniRoutine = async (deploy) => {
  if (typeof deploy !== 'boolean') {
    throw new Error('Bad deployment flag');
  }

  //

  fs.rmdirSync(path.resolve('./deployment'), { recursive: true });
  fs.rmdirSync(path.resolve('./tmp.deployment'), { recursive: true });
  fs.mkdirSync(path.resolve('./deployment'));
  fs.writeFileSync(path.resolve('./deployment/.gitkeep'), '');

  const packageJson = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

  deploy && fs.mkdirSync(path.resolve('./tmp.deployment'));
  deploy &&
    execSync(`git clone git@github.com:sotaoi/app-omni . && git checkout -b ${packageJson.version}`, {
      cwd: path.resolve('./tmp.deployment'),
      stdio: 'inherit',
    });

  Helper.copyRecursiveSync(fs, path, path.resolve('./'), path.resolve('./deployment'), [
    path.resolve('.git'),
    path.resolve('./deployment'),
    path.resolve('./certs'),
    path.resolve('./node_modules'),
    path.resolve('./tmp.deployment'),
  ]);

  execSync('npm run bootstrap:prod', { cwd: path.resolve('./deployment'), stdio: 'inherit' });

  deploy && fs.renameSync(path.resolve('./tmp.deployment/.git'), path.resolve('./deployment/.git'));
  deploy && fs.rmdirSync(path.resolve('./tmp.deployment'), { recursive: true });
  deploy &&
    execSync(
      `git add --all && git commit -m "release ${packageJson.version}" && git push -f -u origin ${packageJson.version}`,
      {
        cwd: path.resolve('./deployment'),
        stdio: 'inherit',
      },
    );
  deploy && fs.rmdirSync(path.resolve('./deployment/.git'), { recursive: true });

  execSync('npm run build:somni', { cwd: path.resolve('../packages/sotaoi-omni'), stdio: 'inherit' });
  Helper.copyRecursiveSync(
    fs,
    path,
    path.resolve('../packages/sotaoi-omni/deployment'),
    path.resolve('./deployment/node_modules/@sotaoi/omni'),
  );

  //
};

module.exports = { buildAomniRoutine };
