module.exports = {
  apps : [{
    name: 'welight',
    script: 'composer-rest-server',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '-c admin@welight -n "never" -p 3100',
    instances: 1,
    autorestart: true,
    watch: false,
    // max_memory_restart: '1G',
    error_file: `${__dirname}/err.log`,
    out_file: `${__dirname}/out.log`,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
