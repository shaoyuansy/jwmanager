var conf = {
    getpwd: 'SELECT value FROM web_conf WHERE conf="init_pswd";',
    update: 'UPDATE web_conf SET value=? WHERE conf="init_pswd";'    
};
module.exports = conf;