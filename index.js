/**
 * @description lmat上线插件
 * @author yanbin01@baidu.com
 * @date 2016-10-13
 */

var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var juicer = require('juicer');
var colors = require('colors');

exports.name = 'publish';
exports.desc = 'publish the FE project to CMS';
exports.options = {
    '-h, --help': '--path指定上线路径 --channel指定上线产品线',
    '--path': '上线到 cms 的路径',
    '--channel': '上线到 cms 的产品线(默认为 nuomi)'
};

exports.run = function(argv, cli) {
    var path = argv.path || '';
    var channel = argv.channel || 'nuomi';
    var tplCmd = '';
    var _cmd = '';
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }
    // if (path && typeof(path) != 'string') {
    //     return console.log('--path参数不能为空'.red);
    // }
    path.length && console.log('上线路径为:', path.green);
    console.log(('上线产品线为:', channel == 'map' ? '地图' : '糯米').green);
    execSync('rm -rf output');
    console.log('已删除上次编译结果'.green);
    //重新项目，将编译之后的工程放置在output目录下
    console.log('开始编译项目'.green);
    execSync('fis3 release ' + (channel == 'map' ? 'prod-map' : 'prod') + ' -d output');
    //压缩为zip
    console.log('开始压缩源代码为zip'.green);
    execSync('cd ./output/' + (channel == 'map' ? 'fwmap/upload/event-lmat/' : 'static/event-lmat/') + ' && zip -r lmat-project.zip ./ -x *.DS_Store');
    //发送至cms
    if (channel == 'map') {
        tplCmd = "curl -F 'user_name=map-lv' -F 'password=map-lvapptest' -F'top_ch_spell=map'  -F'app_id=cms_r' -F'type=0' -F'group_id=1' -F'url=http://map.baidu.com/fwmap/upload/event-lmat/${event_id}' -F 'commonfile=@${f}' 'http://icms.baidu.com:8080/service/app_action/?action=upload'";
    } else {
        tplCmd = "curl -F 'user_name=lv' -F 'password=lvapptest' -F'top_ch_spell=lv'  -F'app_id=cms_r' -F'type=0' -F'group_id=55' -F'url=http://lvyou.baidu.com/static/event-lmat/${event_id}' -F 'commonfile=@${f}' 'http://icms.baidu.com:8080/service/app_action/?action=upload'";
    }
    _cmd = juicer(tplCmd, {
        "event_id": path.length ? path + '/' : '',
        "f": './output/' + (channel == 'map' ? 'fwmap/upload/event-lmat/' : 'static/event-lmat/') + 'lmat-project.zip'
    });
    console.log('开始上线，请耐心等候...'.green);
    return this;
    exec(_cmd, function(error, stdout, stedrr) {
        stdout = JSON.parse(stdout);
        console.log('stdout:', stdout);
        if (error || stdout.success !== true || stdout.result.result !== 1) {
            error = error || stdout.message.field || '';
            return console.log(error.red);
        }
        if (stdout.success === true && stdout.result.result === 1) {
            console.log(stdout.result.file_num + '个文件上线成功！'.bold.green);
        }
    });
};
